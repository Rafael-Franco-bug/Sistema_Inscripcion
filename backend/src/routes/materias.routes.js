const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const {
  listarMaterias, gruposDeLaMateria, crearMateria
} = require('../controllers/materias.controller');

router.get('/', verificarToken, listarMaterias);
router.get('/:id/grupos', verificarToken, gruposDeLaMateria);
router.post('/', verificarToken, crearMateria);

module.exports = router;
