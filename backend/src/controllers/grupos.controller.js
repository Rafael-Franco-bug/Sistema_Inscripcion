const pool = require('../config/db');

// GET /api/grupos
async function listarGrupos(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT g.id_grupo, g.codigo_grupo, g.cupo_maximo,
             m.nombre_materia, d.nombre_docente, d.apellido_docente,
             p.nombre_periodo, p.gestion
      FROM grupo g
      JOIN materia m ON m.id_materia = g.id_materia
      JOIN docente d ON d.id_docente = g.id_docente
      JOIN periodo_academico p ON p.id_periodo = g.id_periodo
      ORDER BY g.codigo_grupo
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar grupos.' });
  }
}

// POST /api/grupos
async function crearGrupo(req, res) {
  try {
    const { id_materia, id_docente, id_periodo, codigo_grupo, cupo_maximo } = req.body;
    if (!id_materia || !id_docente || !id_periodo || !codigo_grupo || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    const { rows } = await pool.query(
      `INSERT INTO grupo (id_materia, id_docente, id_periodo, codigo_grupo, cupo_maximo)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [id_materia, id_docente, id_periodo, codigo_grupo, cupo_maximo]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el grupo.' });
  }
}

// POST /api/grupos/:id/horario  (asignar horario + aula a un grupo)
async function asignarHorario(req, res) {
  try {
    const { id } = req.params;
    const { id_horario, id_aula } = req.body;
    if (!id_horario || !id_aula) {
      return res.status(400).json({ error: 'id_horario e id_aula son obligatorios.' });
    }
    const { rows } = await pool.query(
      `INSERT INTO grupo_horario (id_grupo, id_horario, id_aula) VALUES ($1,$2,$3) RETURNING *`,
      [id, id_horario, id_aula]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asignar el horario.' });
  }
}

module.exports = { listarGrupos, crearGrupo, asignarHorario };
