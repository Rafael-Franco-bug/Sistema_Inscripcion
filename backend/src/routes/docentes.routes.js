const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const {
  listarDocentes, misDocentes, crearDocente, actualizarDocente, eliminarDocente
} = require('../controllers/docentes.controller');

router.get('/', verificarToken, listarDocentes);
router.get('/mis-docentes', verificarToken, misDocentes);
router.post('/', verificarToken, crearDocente);
router.put('/:id', verificarToken, actualizarDocente);
router.delete('/:id', verificarToken, eliminarDocente);

module.exports = router;
