const { sequelize, DataTypes } = require('../config/database');
const Entrenador = require('./Entrenador');

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  anio_nacimiento: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_entrenador: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Categorias',
  timestamps: false
});

// Relaciones
Categoria.belongsTo(Entrenador, { 
  foreignKey: 'id_entrenador', 
  targetKey: 'id_entrenador' 
});
Entrenador.hasMany(Categoria, { 
  foreignKey: 'id_entrenador', 
  sourceKey: 'id_entrenador' 
});

module.exports = Categoria;
