const pool = require('../config/db');
const { hashPassword } = require('../utils/password');

// GET /api/estudiantes  (listado, uso administrativo)
async function listarEstudiantes(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT e.id_estudiante, e.cod_sis, e.nombres, e.apellidos, e.ci, e.correo,
             e.telefono, e.genero, e.fecha_nacimiento, c.nombre_carrera
      FROM estudiante e
      LEFT JOIN carrera c ON e.id_carrera = c.id_carrera
      ORDER BY e.apellidos, e.nombres
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar estudiantes.' });
  }
}

// GET /api/estudiantes/perfil  (perfil del estudiante autenticado)
async function miPerfil(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { rows } = await pool.query(`
      SELECT e.id_estudiante, e.cod_sis, e.nombres, e.apellidos, e.ci, e.correo,
             e.telefono, e.genero, e.fecha_nacimiento, e.datos_biograficos,
             c.nombre_carrera, c.id_carrera
      FROM estudiante e
      LEFT JOIN carrera c ON e.id_carrera = c.id_carrera
      WHERE e.id_estudiante = $1
    `, [id_estudiante]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
}

// PUT /api/estudiantes/perfil  (editar teléfono / correo, como en el prototipo "Editar Datos")
async function editarPerfil(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { telefono, correo } = req.body;

    if (!telefono && !correo) {
      return res.status(400).json({ error: 'Debe enviar al menos un campo para actualizar.' });
    }

    const campos = [];
    const valores = [];
    let idx = 1;

    if (telefono) {
      campos.push(`telefono = $${idx++}`);
      valores.push(telefono);
    }
    if (correo) {
      campos.push(`correo = $${idx++}`);
      valores.push(correo);
    }
    valores.push(id_estudiante);

    const { rows } = await pool.query(
      `UPDATE estudiante SET ${campos.join(', ')} WHERE id_estudiante = $${idx} RETURNING id_estudiante, correo, telefono`,
      valores
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Ese correo ya está en uso por otro estudiante.' });
    }
    res.status(500).json({ error: 'Error al actualizar el perfil.' });
  }
}

// PUT /api/estudiantes/perfil/password (cambiar contraseña)
async function cambiarPassword(req, res) {
  try {
    const { id_estudiante } = req.estudiante;
    const { passwordNueva } = req.body;

    if (!passwordNueva || passwordNueva.length < 6) {
      return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres.' });
    }

    const hash = hashPassword(passwordNueva);
    await pool.query('UPDATE estudiante SET password_hash = $1 WHERE id_estudiante = $2', [hash, id_estudiante]);
    res.json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cambiar la contraseña.' });
  }
}

module.exports = { listarEstudiantes, miPerfil, editarPerfil, cambiarPassword };
