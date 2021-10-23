const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    dificulty: {
      type: DataTypes.INTEGER,
      validate: {
          min: 1,
          max: 5
      },
      allowNull: false
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    season: {
        type: DataTypes.ENUM("Verano","Otoño","Invierno","Primavera"),
        allowNull: false,
    },
  }, {timestamps: false} );
};