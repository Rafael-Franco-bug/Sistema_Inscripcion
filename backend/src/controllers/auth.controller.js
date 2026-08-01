const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { verifyPassword } = require('../utils/password');
require('dotenv').config();

// POST /api/auth/login
async function login(req, res) {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM estudiante WHERE correo = $1',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const estudiante = rows[0];
    const passwordValida = verifyPassword(password, estudiante.password_hash);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const payload = {
      id_estudiante: estudiante.id_estudiante,
      cod_sis: estudiante.cod_sis,
      correo: estudiante.correo,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    return res.json({
      token,
      estudiante: payload,
    });
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
}

// GET /api/auth/me  (verifica el token y devuelve datos básicos)
async function me(req, res) {
  return res.json({ estudiante: req.estudiante });
}

module.exports = { login, me };
