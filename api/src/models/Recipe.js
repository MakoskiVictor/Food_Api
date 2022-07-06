const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healtScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        max: 100,
        min: 0
      }
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  });
};
