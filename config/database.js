const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL no esta configurada en las variables de entorno.');
  console.error('Configurala en Render → Environment → Add Environment Variable');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

async function ensureDatabaseExists() {
  console.log('DB conectada OK');
}

module.exports = { sequelize, ensureDatabaseExists, DataTypes };
