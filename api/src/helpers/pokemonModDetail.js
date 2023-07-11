const { pokemonModDetailType } = require("./pokemonModDetailType");

module.exports = {
  pokemonModDetail: (data) => {
    const {
      id,
      name,
      sprites: {
        other: {
          dream_world: { front_default: image },
        },
      },
      stats: [
        { base_stat: hp },
        { base_stat: attack },
        { base_stat: defense },
        ,
        ,
        { base_stat: speed },
      ],
      height,
      weight,
      types,
    } = data;

    return {
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types: pokemonModDetailType(types),
    };
  },
};
