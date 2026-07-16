const { sequelize, DataTypes } = require('../config/database');
const Jugador = require('./Jugador');

const Cuota = sequelize.define('Cuota', {
  id_cuota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_jugador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mes: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_vencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fecha_pago: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'vencido'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'Cuotas',
  timestamps: false
});

// Relaciones
Cuota.belongsTo(Jugador, { 
  foreignKey: 'id_jugador', 
  targetKey: 'id_jugador' 
});
Jugador.hasMany(Cuota, { 
  foreignKey: 'id_jugador', 
  sourceKey: 'id_jugador' 
});

module.exports = Cuota;
