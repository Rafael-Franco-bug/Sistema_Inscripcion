const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const { miHorario } = require('../controllers/horarios.controller');

router.get('/mio', verificarToken, miHorario);

module.exports = router;
