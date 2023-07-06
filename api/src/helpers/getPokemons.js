module.exports = {
  getAllPresentPokemons: async (urls) => {
    const promiseAllPokemons = await Promise.all(urls);
    return promiseAllPokemons.map((res) => {
      const { name, sprites, types } = res.data;
      return {
        name,
        image: sprites.front_default,
        types,
      };
    });
  },
};
