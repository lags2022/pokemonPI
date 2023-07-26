const { Type } = require("../db");
const axios = require("axios");
const url = "https://pokeapi.co/api/v2/type";

module.exports = {
  getTypes: async () => {
    try {
      const types = await Type.findAll();

      if (!types.length) {
        const { data } = await axios.get(url);

        const dataParse = data.results.map((type) => {
          return {
            name: type.name,
          };
        });

        const createTypes = await Type.bulkCreate(dataParse);
        return createTypes;
      }

      return types;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
