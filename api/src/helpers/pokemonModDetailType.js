module.exports = {
  pokemonModDetailType: (types) => {
    const modifiedTypes = [];
    types.forEach((t) => {
      modifiedTypes.push({ name: t.type.name });
    });
    return modifiedTypes;
  },
};
