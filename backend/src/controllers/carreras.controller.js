const pool = require('../config/db');

// GET /api/carreras
async function listarCarreras(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT c.id_carrera, c.nombre_carrera, c.codigo_carrera, f.nombre_facultad
      FROM carrera c
      LEFT JOIN facultad f ON c.id_facultad = f.id_facultad
      ORDER BY c.nombre_carrera
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar carreras.' });
  }
}

// GET /api/carreras/facultades
async function listarFacultades(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM facultad ORDER BY nombre_facultad');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar facultades.' });
  }
}

// GET /api/carreras/:id/materias-por-nivel  (materias agrupadas por nivel/semestre)
async function materiasDeLaCarrera(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM materia WHERE id_carrera = $1 ORDER BY nivel, nombre_materia',
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener materias de la carrera.' });
  }
}

// POST /api/carreras
async function crearCarrera(req, res) {
  try {
    const { id_facultad, nombre_carrera, codigo_carrera } = req.body;
    if (!nombre_carrera || !codigo_carrera) {
      return res.status(400).json({ error: 'nombre_carrera y codigo_carrera son obligatorios.' });
    }
    const { rows } = await pool.query(
      `INSERT INTO carrera (id_facultad, nombre_carrera, codigo_carrera) VALUES ($1,$2,$3) RETURNING *`,
      [id_facultad || null, nombre_carrera, codigo_carrera]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(409).json({ error: 'Ya existe una carrera con ese código.' });
    res.status(500).json({ error: 'Error al crear la carrera.' });
  }
}

module.exports = { listarCarreras, listarFacultades, materiasDeLaCarrera, crearCarrera };
