const pool = require('../config/db');

// GET /api/docentes  (listado general)
async function listarDocentes(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM docente ORDER BY apellido_docente, nombre_docente'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar docentes.' });
  }
}

// GET /api/docentes/mis-docentes  (docentes del estudiante autenticado, según sus inscripciones)
async function misDocentes(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { rows } = await pool.query(`
      SELECT DISTINCT d.id_docente, d.nombre_docente, d.apellido_docente, d.correo, d.telefono,
             m.nombre_materia
      FROM docente d
      JOIN grupo g ON g.id_docente = d.id_docente
      JOIN inscripcion i ON i.id_grupo = g.id_grupo
      JOIN materia m ON m.id_materia = g.id_materia
      WHERE i.id_estudiante = $1
      ORDER BY d.apellido_docente
    `, [id_estudiante]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los docentes del estudiante.' });
  }
}

// POST /api/docentes
async function crearDocente(req, res) {
  try {
    const { nombre_docente, apellido_docente, correo, telefono } = req.body;
    if (!nombre_docente || !apellido_docente || !correo) {
      return res.status(400).json({ error: 'nombre_docente, apellido_docente y correo son obligatorios.' });
    }
    const { rows } = await pool.query(
      `INSERT INTO docente (nombre_docente, apellido_docente, correo, telefono)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [nombre_docente, apellido_docente, correo, telefono || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Ya existe un docente con ese correo.' });
    }
    res.status(500).json({ error: 'Error al crear el docente.' });
  }
}

// PUT /api/docentes/:id
async function actualizarDocente(req, res) {
  try {
    const { id } = req.params;
    const { nombre_docente, apellido_docente, correo, telefono } = req.body;
    const { rows } = await pool.query(
      `UPDATE docente SET nombre_docente = $1, apellido_docente = $2, correo = $3, telefono = $4
       WHERE id_docente = $5 RETURNING *`,
      [nombre_docente, apellido_docente, correo, telefono, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Docente no encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el docente.' });
  }
}

// DELETE /api/docentes/:id
async function eliminarDocente(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM docente WHERE id_docente = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Docente no encontrado.' });
    res.json({ mensaje: 'Docente eliminado correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo eliminar: el docente tiene grupos asignados.' });
  }
}

module.exports = { listarDocentes, misDocentes, crearDocente, actualizarDocente, eliminarDocente };
