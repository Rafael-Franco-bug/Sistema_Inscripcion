const pool = require('../config/db');

// GET /api/kardex  (historial académico completo del estudiante autenticado)
async function miKardex(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { rows } = await pool.query(`
      SELECT p.gestion, p.nombre_periodo, m.nombre_materia, m.creditos,
             g.codigo_grupo, i.nota_final, i.estado
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo
      JOIN materia m ON m.id_materia = g.id_materia
      JOIN periodo_academico p ON p.id_periodo = g.id_periodo
      WHERE i.id_estudiante = $1
      ORDER BY p.gestion, p.id_periodo, m.nombre_materia
    `, [id_estudiante]);

    const totalCreditosAprobados = rows
      .filter(r => r.estado === 'Aprobado')
      .reduce((sum, r) => sum + Number(r.creditos), 0);

    const notasValidas = rows.filter(r => r.nota_final !== null).map(r => Number(r.nota_final));
    const promedio = notasValidas.length
      ? (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length).toFixed(2)
      : null;

    res.json({ historial: rows, resumen: { totalCreditosAprobados, promedio } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el kardex.' });
  }
}

module.exports = { miKardex };
