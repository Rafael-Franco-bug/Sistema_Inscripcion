const pool = require('../config/db');

// GET /api/materias
async function listarMaterias(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT m.*, c.nombre_carrera
      FROM materia m
      LEFT JOIN carrera c ON m.id_carrera = c.id_carrera
      ORDER BY c.nombre_carrera, m.nivel, m.nombre_materia
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar materias.' });
  }
}

// GET /api/materias/:id/grupos  (oferta de grupos de una materia, con docente/horario/aula)
async function gruposDeLaMateria(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`
      SELECT g.id_grupo, g.codigo_grupo, g.cupo_maximo,
             d.id_docente, d.nombre_docente, d.apellido_docente,
             p.nombre_periodo, p.gestion,
             json_agg(json_build_object(
                'dia', h.dia, 'hora_inicio', h.hora_inicio, 'hora_fin', h.hora_fin,
                'edificio', a.edificio, 'num_aula', a.num_aula
             )) AS horarios,
             (g.cupo_maximo - COALESCE((
                SELECT COUNT(*) FROM inscripcion i2 WHERE i2.id_grupo = g.id_grupo AND i2.estado = 'Inscrito'
             ), 0)) AS cupos_disponibles
      FROM grupo g
      JOIN docente d ON d.id_docente = g.id_docente
      JOIN periodo_academico p ON p.id_periodo = g.id_periodo
      LEFT JOIN grupo_horario gh ON gh.id_grupo = g.id_grupo
      LEFT JOIN horario h ON h.id_horario = gh.id_horario
      LEFT JOIN aula a ON a.id_aula = gh.id_aula
      WHERE g.id_materia = $1
      GROUP BY g.id_grupo, d.id_docente, p.id_periodo
      ORDER BY g.codigo_grupo
    `, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los grupos de la materia.' });
  }
}

// POST /api/materias
async function crearMateria(req, res) {
  try {
    const { id_carrera, nombre_materia, nivel, creditos, codigo_materia } = req.body;
    if (!id_carrera || !nombre_materia || !nivel || !creditos || !codigo_materia) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    const { rows } = await pool.query(
      `INSERT INTO materia (id_carrera, nombre_materia, nivel, creditos, codigo_materia)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [id_carrera, nombre_materia, nivel, creditos, codigo_materia]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(409).json({ error: 'Ya existe una materia con ese código.' });
    res.status(500).json({ error: 'Error al crear la materia.' });
  }
}

module.exports = { listarMaterias, gruposDeLaMateria, crearMateria };
