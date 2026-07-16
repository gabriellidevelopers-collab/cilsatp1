const { sequelize, DataTypes } = require('../config/database');
const Jugador = require('./Jugador');

const Asistencia = sequelize.define('Asistencia', {
  id_asistencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_jugador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  presente: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  observaciones: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'Asistencias',
  timestamps: false
});

// Relaciones
Asistencia.belongsTo(Jugador, { 
  foreignKey: 'id_jugador', 
  targetKey: 'id_jugador' 
});
Jugador.hasMany(Asistencia, { 
  foreignKey: 'id_jugador', 
  sourceKey: 'id_jugador' 
});

module.exports = Asistencia;
