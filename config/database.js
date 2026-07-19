const { Client } = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

let dbUser, dbPassword, dbHost, dbPort, dbName;

if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  dbHost = url.hostname;
  dbPort = url.port || 5432;
  dbName = url.pathname.replace('/', '');
  dbUser = url.username;
  dbPassword = url.password;
  console.log('Usando DATABASE_URL para conexion');
} else {
  dbUser = process.env.DB_USER;
  dbPassword = process.env.DB_PASSWORD;
  dbHost = process.env.DB_HOST;
  dbPort = process.env.DB_PORT;
  dbName = process.env.DB_NAME;
  console.log('Usando variables individuales de conexion');
}

async function ensureDatabaseExists() {
  // Si hay DATABASE_URL, la DB ya existe - no intentar crearla
  if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL detectada, saltando creacion de DB.');
    return;
  }

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
      console.log(`La base de datos "${dbName}" no existe. Creandola...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Base de datos "${dbName}" creada con exito.`);
    } else {
      console.log(`La base de datos "${dbName}" ya existe.`);
    }
  } catch (error) {
    console.error('Error al verificar/crear la base de datos:', error.message || error);
  } finally {
    await client.end();
  }
}

const sequelizeConfig = process.env.DATABASE_URL 
  ? {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    }
  : {
      host: dbHost,
      dialect: 'postgres',
      port: dbPort,
      logging: false,
    };

const sequelize = new Sequelize(
  process.env.DATABASE_URL || dbName,
  dbUser,
  dbPassword,
  sequelizeConfig
);

module.exports = { sequelize, ensureDatabaseExists, DataTypes };
