const pool = require('../config/db');

// GET /api/inscripciones/mias  (materias inscritas en el periodo vigente)
async function misInscripciones(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { rows } = await pool.query(`
      SELECT i.id_inscripcion, i.fecha_inscripcion, i.estado, i.nota_final,
             m.nombre_materia, m.creditos, g.codigo_grupo,
             d.nombre_docente, d.apellido_docente, p.nombre_periodo, p.gestion
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo
      JOIN materia m ON m.id_materia = g.id_materia
      JOIN docente d ON d.id_docente = g.id_docente
      JOIN periodo_academico p ON p.id_periodo = g.id_periodo
      WHERE i.id_estudiante = $1
      ORDER BY p.gestion DESC, p.id_periodo DESC, m.nombre_materia
    `, [id_estudiante]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tus inscripciones.' });
  }
}

// Verifica si el estudiante tiene la matrícula pagada para el periodo de un grupo dado
async function tieneMatriculaPagada(client, id_estudiante, id_periodo) {
  const { rows } = await client.query(`
    SELECT pm.estado_pago
    FROM matricula ma
    JOIN pago_matricula pm ON pm.id_matricula = ma.id_matricula
    WHERE ma.id_estudiante = $1 AND ma.id_periodo = $2
    ORDER BY pm.fecha_pago DESC
    LIMIT 1
  `, [id_estudiante, id_periodo]);
  return rows.length > 0 && rows[0].estado_pago === 'Pagado';
}

// POST /api/inscripciones/confirmar
// body: { id_grupos: [1,2,3] }  -> inscribe al estudiante autenticado en varios grupos a la vez
async function confirmarInscripcion(req, res) {
  const { id_estudiante } = req.estudiante;
  const { id_grupos } = req.body;

  if (!Array.isArray(id_grupos) || id_grupos.length === 0) {
    return res.status(400).json({ error: 'Debes seleccionar al menos una materia/grupo.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Traer info de los grupos seleccionados: materia, periodo, cupo, horarios
    const { rows: grupos } = await client.query(`
      SELECT g.id_grupo, g.id_periodo, g.cupo_maximo, g.codigo_grupo, m.nombre_materia,
             json_agg(json_build_object('dia', h.dia, 'hora_inicio', h.hora_inicio, 'hora_fin', h.hora_fin)) AS horarios
      FROM grupo g
      JOIN materia m ON m.id_materia = g.id_materia
      LEFT JOIN grupo_horario gh ON gh.id_grupo = g.id_grupo
      LEFT JOIN horario h ON h.id_horario = gh.id_horario
      WHERE g.id_grupo = ANY($1::int[])
      GROUP BY g.id_grupo, m.nombre_materia
    `, [id_grupos]);

    if (grupos.length !== id_grupos.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Uno o más grupos seleccionados no existen.' });
    }

    // Validar pago de matrícula para cada periodo involucrado
    const periodosUnicos = [...new Set(grupos.map(g => g.id_periodo))];
    for (const idPeriodo of periodosUnicos) {
      const pagado = await tieneMatriculaPagada(client, id_estudiante, idPeriodo);
      if (!pagado) {
        await client.query('ROLLBACK');
        return res.status(403).json({
          error: 'No tienes el pago de matrícula habilitado para este periodo. Regulariza tu pago antes de inscribirte.'
        });
      }
    }

    // Validar que no esté ya inscrito en alguno de esos grupos
    const { rows: yaInscrito } = await client.query(
      `SELECT id_grupo FROM inscripcion WHERE id_estudiante = $1 AND id_grupo = ANY($2::int[])`,
      [id_estudiante, id_grupos]
    );
    if (yaInscrito.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Ya estás inscrito en uno de los grupos seleccionados.' });
    }

    // Validar cupo disponible por grupo
    for (const g of grupos) {
      const { rows: countRows } = await client.query(
        `SELECT COUNT(*)::int AS total FROM inscripcion WHERE id_grupo = $1 AND estado = 'Inscrito'`,
        [g.id_grupo]
      );
      if (countRows[0].total >= g.cupo_maximo) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: `No hay cupos disponibles en el grupo ${g.codigo_grupo} (${g.nombre_materia}).` });
      }
    }

    // Validar choque de horarios entre los grupos seleccionados
    const bloques = [];
    for (const g of grupos) {
      for (const h of (g.horarios || [])) {
        if (h && h.dia) bloques.push({ codigo: g.codigo_grupo, materia: g.nombre_materia, ...h });
      }
    }
    for (let i = 0; i < bloques.length; i++) {
      for (let j = i + 1; j < bloques.length; j++) {
        const a = bloques[i], b = bloques[j];
        if (a.dia === b.dia && a.hora_inicio < b.hora_fin && b.hora_inicio < a.hora_fin) {
          await client.query('ROLLBACK');
          return res.status(409).json({
            error: `Choque de horario entre ${a.materia} (${a.codigo}) y ${b.materia} (${b.codigo}) el día ${a.dia}.`
          });
        }
      }
    }

    // Todo válido: insertar inscripciones
    const inserciones = [];
    for (const idGrupo of id_grupos) {
      const { rows } = await client.query(
        `INSERT INTO inscripcion (id_estudiante, id_grupo, fecha_inscripcion, estado)
         VALUES ($1, $2, CURRENT_DATE, 'Inscrito') RETURNING *`,
        [id_estudiante, idGrupo]
      );
      inserciones.push(rows[0]);
    }

    await client.query('COMMIT');
    res.status(201).json({ mensaje: 'Inscripción registrada correctamente.', inscripciones: inserciones });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la inscripción.' });
  } finally {
    client.release();
  }
}

module.exports = { misInscripciones, confirmarInscripcion };
