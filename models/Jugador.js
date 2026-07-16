const { sequelize, DataTypes } = require('../config/database');
const Tutor = require('./Tutor');
const Categoria = require('./Categoria');

const Jugador = sequelize.define('Jugador', {
  id_jugador: {
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
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  DNI: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  fecha_inscripcion: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  id_tutor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Jugadores',
  timestamps: false
});

// Relaciones
Jugador.belongsTo(Tutor, { 
  foreignKey: 'id_tutor', 
  targetKey: 'id_tutor' 
});
Tutor.hasMany(Jugador, { 
  foreignKey: 'id_tutor', 
  sourceKey: 'id_tutor' 
});

Jugador.belongsTo(Categoria, { 
  foreignKey: 'id_categoria', 
  targetKey: 'id_categoria' 
});
Categoria.hasMany(Jugador, { 
  foreignKey: 'id_categoria', 
  sourceKey: 'id_categoria' 
});

module.exports = Jugador;
