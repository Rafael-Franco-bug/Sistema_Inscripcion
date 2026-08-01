const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const estudiantesRoutes = require('./routes/estudiantes.routes');
const docentesRoutes = require('./routes/docentes.routes');
const carrerasRoutes = require('./routes/carreras.routes');
const materiasRoutes = require('./routes/materias.routes');
const gruposRoutes = require('./routes/grupos.routes');
const inscripcionesRoutes = require('./routes/inscripciones.routes');
const kardexRoutes = require('./routes/kardex.routes');
const horariosRoutes = require('./routes/horarios.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/docentes', docentesRoutes);
app.use('/api/carreras', carrerasRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/kardex', kardexRoutes);
app.use('/api/horarios', horariosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Manejo de errores no controlados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

module.exports = app;
