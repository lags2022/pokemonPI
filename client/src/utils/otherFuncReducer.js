export const orderPokemons = (a, b, value) => {
  if (value === "AZ") {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  } else if (value === "ZA") {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return +1;
    }
    return 0;
  } else if (value === "AscAttack") {
    return a.attack - b.attack;
  } else {
    return b.attack - a.attack;
  }
};

export const filterPokemons = (array, options) => {
  let arrayMod = array;
  if (options && options.type)
    arrayMod = arrayMod.filter((p) =>
      p.types.some((t) => t.name === options.type)
    );
  if (options && options.apiordb)
    arrayMod = arrayMod.filter((p) =>
      options.apiordb === "database" ? p.createDb : !p.createDb
    );
  if (options && options.order)
    //no olvidar el metodo sort es mutable, es decir que modifica el array original
    arrayMod = [...arrayMod].sort((a, b) => orderPokemons(a, b, options.order));

  return arrayMod;
};
