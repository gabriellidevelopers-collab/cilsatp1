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

// Ruta para resetear todas las tablas (SOLO PARA DESARROLLO)
app.delete('/api/reset', async (req, res) => {
  try {
    const { Asistencia, Cuota, Jugador, Categoria, Entrenador, Tutor } = require('./models');
    const { sequelize } = require('./config/database');
    
    // Desactivar restricciones de claves foráneas temporalmente
    await sequelize.query('SET CONSTRAINTS ALL DEFERRED');
    
    const asistencias = await Asistencia.destroy({ where: {}, truncate: true, restartIdentity: true });
    const cuotas = await Cuota.destroy({ where: {}, truncate: true, restartIdentity: true });
    const jugadores = await Jugador.destroy({ where: {}, truncate: true, restartIdentity: true });
    const categorias = await Categoria.destroy({ where: {}, truncate: true, restartIdentity: true });
    const entrenadores = await Entrenador.destroy({ where: {}, truncate: true, restartIdentity: true });
    const tutores = await Tutor.destroy({ where: {}, truncate: true, restartIdentity: true });
    
    await sequelize.query('SET CONSTRAINTS ALL IMMEDIATE');
    
    res.json({ 
      success: true, 
      message: 'Todas las tablas fueron reseteadas',
      eliminados: {
        asistencias, cuotas, jugadores, categorias, entrenadores, tutores
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al resetear: ' + error.message });
  }
});

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
