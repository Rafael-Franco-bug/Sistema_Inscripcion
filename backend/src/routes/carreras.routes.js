const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const {
  listarCarreras, listarFacultades, materiasDeLaCarrera, crearCarrera
} = require('../controllers/carreras.controller');

router.get('/', verificarToken, listarCarreras);
router.get('/facultades', verificarToken, listarFacultades);
router.get('/:id/materias', verificarToken, materiasDeLaCarrera);
router.post('/', verificarToken, crearCarrera);

module.exports = router;
