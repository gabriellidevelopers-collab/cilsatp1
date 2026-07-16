const { sequelize, DataTypes } = require('../config/database');

const Entrenador = sequelize.define('Entrenador', {
  id_entrenador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  DNI: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  especialidad: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'Entrenadores',
  timestamps: false
});

module.exports = Entrenador;
