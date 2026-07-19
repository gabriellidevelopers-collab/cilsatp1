const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

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
  console.log('DATABASE_URL detectada, saltando creacion de DB.');
}

module.exports = { sequelize, ensureDatabaseExists, DataTypes };
