module.exports = {
  pokemonModDetailType: (types) => {
    const modifiedTypes = [];
    types.forEach((t) => {
      modifiedTypes.push(t.type.name);
    });
    return modifiedTypes;
  },
};
