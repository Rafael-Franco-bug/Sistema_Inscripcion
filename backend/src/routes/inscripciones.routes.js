const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const { misInscripciones, confirmarInscripcion } = require('../controllers/inscripciones.controller');

router.get('/mias', verificarToken, misInscripciones);
router.post('/confirmar', verificarToken, confirmarInscripcion);

module.exports = router;
