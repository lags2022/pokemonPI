const { pokemonModDetail } = require("./pokemonModDetail");

module.exports = {
  pokemonMod: async (urls) => {
    const promiseAllPokemons = await Promise.all(urls);
    return promiseAllPokemons.map(({ data }) => {
      return pokemonModDetail(data);
    });
  },
};
