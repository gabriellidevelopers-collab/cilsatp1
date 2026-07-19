require('dotenv').config();
const path = require('path');
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

// Servir archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: servir index.html para rutas del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware de manejo de errores centralizado
app.use(errorHandler);

async function startServer() {
  try {
    console.log('Iniciando servidor...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'CONFIGURADA' : 'NO CONFIGURADA');
    
    await ensureDatabaseExists();

    console.log('Conectando a PostgreSQL...');
    await sequelize.authenticate();
    console.log(' Conexion con PostgreSQL OK');

    console.log(' Sincronizando modelos...');
    await sequelize.sync({ alter: true });
    console.log(' Modelos sincronizados OK');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en el puerto http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('ERROR CRITICO:', error.message || error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

startServer();

module.exports = app;
