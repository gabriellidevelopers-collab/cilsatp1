require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const { sequelize, ensureDatabaseExists } = require('./config/database');
const errorHandler = require('./middleware/errorHandler.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const tutorRoutes = require('./routes/tutorRoutes');
const entrenadorRoutes = require('./routes/entrenadorRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const jugadorRoutes = require('./routes/jugadorRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const cuotaRoutes = require('./routes/cuotaRoutes');

app.use('/api/tutores', tutorRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/jugadores', jugadorRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/cuotas', cuotaRoutes);

app.get('/', (req, res) => {
    res.json({ success: true, message: 'API Escuela de Fútbol Infantil - OK' });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores centralizado
app.use(errorHandler);

async function startServer() {
  try {
    await ensureDatabaseExists();

    await sequelize.authenticate();
    console.log('Conexión con PostgreSQL establecida correctamente.');

    await sequelize.sync({ alter: true });
    console.log('Modelos de la base de datos sincronizados.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
  }
}

startServer();

module.exports = app;
