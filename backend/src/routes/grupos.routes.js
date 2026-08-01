const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const { listarGrupos, crearGrupo, asignarHorario } = require('../controllers/grupos.controller');

router.get('/', verificarToken, listarGrupos);
router.post('/', verificarToken, crearGrupo);
router.post('/:id/horario', verificarToken, asignarHorario);

module.exports = router;
