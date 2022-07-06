const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('diet', {
        name: {
            type: DataTypes.ENUM("gluten free", "dairy free", "vegetarian", "ketogenic", "lacto vegetarian", "lacto ovo vegetarian",
            "ovo vegetarian", "vegan", "pescatarian", "paleolithic", "primal", "fodmap friendly", "whole 30"),
            allowNull: false,
        },
    });
};