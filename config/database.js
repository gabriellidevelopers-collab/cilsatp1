const { Client } = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Soporta tanto DATABASE_URL (Render) como variables individuales (local)
let dbUser, dbPassword, dbHost, dbPort, dbName;

if (process.env.DATABASE_URL) {
  // Render u otro servicio que provea DATABASE_URL
  const url = new URL(process.env.DATABASE_URL);
  dbHost = url.hostname;
  dbPort = url.port || 5432;
  dbName = url.pathname.replace('/', '');
  dbUser = url.username;
  dbPassword = url.password;
} else {
  // Desarrollo local con variables individuales
  dbUser = process.env.DB_USER;
  dbPassword = process.env.DB_PASSWORD;
  dbHost = process.env.DB_HOST;
  dbPort = process.env.DB_PORT;
  dbName = process.env.DB_NAME;
}

async function ensureDatabaseExists() {
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres',
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    
    if (res.rowCount === 0) {
      console.log(`La base de datos "${dbName}" no existe. Creándola...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Base de datos "${dbName}" creada con éxito.`);
    } else {
      console.log(`La base de datos "${dbName}" ya existe.`);
    }
  } catch (error) {
    console.error('Error al verificar/crear la base de datos:', error.message);
  } finally {
    await client.end();
  }
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: false,
  dialectOptions: process.env.DATABASE_URL ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  } : {}
});

module.exports = { sequelize, ensureDatabaseExists, DataTypes };
