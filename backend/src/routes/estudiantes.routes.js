const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const {
  listarEstudiantes, miPerfil, editarPerfil, cambiarPassword
} = require('../controllers/estudiantes.controller');

router.get('/', verificarToken, listarEstudiantes);
router.get('/perfil', verificarToken, miPerfil);
router.put('/perfil', verificarToken, editarPerfil);
router.put('/perfil/password', verificarToken, cambiarPassword);

module.exports = router;
