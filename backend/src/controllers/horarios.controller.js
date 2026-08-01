const pool = require('../config/db');

// GET /api/horarios/mio  (horario semanal del estudiante, materias inscritas en el periodo vigente)
async function miHorario(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { rows } = await pool.query(`
      SELECT m.nombre_materia, g.codigo_grupo, h.dia, h.hora_inicio, h.hora_fin,
             a.edificio, a.num_aula, d.nombre_docente, d.apellido_docente
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo
      JOIN materia m ON m.id_materia = g.id_materia
      JOIN docente d ON d.id_docente = g.id_docente
      JOIN grupo_horario gh ON gh.id_grupo = g.id_grupo
      JOIN horario h ON h.id_horario = gh.id_horario
      JOIN aula a ON a.id_aula = gh.id_aula
      WHERE i.id_estudiante = $1 AND i.estado = 'Inscrito'
      ORDER BY
        CASE h.dia
          WHEN 'Lunes' THEN 1 WHEN 'Martes' THEN 2 WHEN 'Miércoles' THEN 3
          WHEN 'Jueves' THEN 4 WHEN 'Viernes' THEN 5 WHEN 'Sábado' THEN 6 ELSE 7
        END, h.hora_inicio
    `, [id_estudiante]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el horario.' });
  }
}

module.exports = { miHorario };
