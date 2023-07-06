module.exports = {
  parsePokemon: (data) => {
    const {
      id,
      name,
      sprites: { front_default: image },
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
      types,
    };
  },
};
