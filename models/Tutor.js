const { sequelize, DataTypes } = require('../config/database');

const Tutor = sequelize.define('Tutor', {
  id_tutor: {
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
    allowNull: true,
    unique: true
  },
  parentesco: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'Tutores',
  timestamps: false
});

module.exports = Tutor;
