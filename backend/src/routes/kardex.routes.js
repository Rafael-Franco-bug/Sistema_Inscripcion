const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const { miKardex } = require('../controllers/kardex.controller');

router.get('/', verificarToken, miKardex);

module.exports = router;
