const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[^\d]+$/,
          len: {
            args: [3, 20],
            msg: "Name must be between 2 and 20 characters",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
          max: 200,
          not: /[a-zA-Z]/,
        },
      },
      attack: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 5,
          max: 255,
          not: /[a-zA-Z]/,
        },
      },
      defense: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 5,
          max: 255,
          not: /[a-zA-Z]/,
        },
      },
      speed: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          min: 5,
          max: 150,
          not: /[a-zA-Z]/,
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          min: 0.1,
          max: 20,
          not: /[a-zA-Z]/,
        },
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          min: 1,
          max: 1000,
          not: /[a-zA-Z]/,
        },
      },
      createDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
