const { Pokemon, Type } = require("../db");
const { pokemonMod } = require("../helpers/pokemonMod");
const { pokemonModDetail } = require("../helpers/pokemonModDetail");
const pokemonModDetailTypeModel = require("../helpers/pokemonModDetailTypeModel");

const axios = require("axios");
const { Op, UUIDV4 } = require("sequelize");

url = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async () => {
  try {
    const { data } = await axios.get(`${url}?limit=151`);

    const urlsMapAxios = data.results.map((p) => axios.get(p.url));
    const dataPokemons = await pokemonMod(urlsMapAxios);

    for (const pokemon of dataPokemons) {
      const newArray = await pokemonModDetailTypeModel(pokemon.types, Type);
      pokemon.types = newArray;
    }

    const AllPokemonsDb = await Pokemon.findAll({
      include: {
        model: Type,
        through: {
          attributes: [],
        },
      },
    });

    console.log(AllPokemonsDb);
    return [...dataPokemons, ...AllPokemonsDb];
  } catch (error) {
    throw new Error(error.message);
  }
};

const uuidv4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUUIDv4(id) {
  return uuidv4Regex.test(id);
}

const getIdPokemon = async (id) => {
  try {
    if (isUUIDv4(id)) {
      const pokemonsDb = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          through: {
            attributes: [],
          },
        },
      });

      return pokemonsDb;
    }

    const { data } = await axios.get(`${url}/${id}`);
    const detailPokemon = pokemonModDetail(data);
    const detailPokemonMod = await pokemonModDetailTypeModel(
      detailPokemon.types,
      Type
    );
    detailPokemon.types = detailPokemonMod;
    return detailPokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getNameQuery = async (query) => {
  try {
    const pokemonsDb = await Pokemon.findOne({
      where: {
        name: {
          [Op.iLike]: query,
        },
      },
      include: {
        model: Type,
        through: {
          attributes: [],
        },
      },
    });

    if (pokemonsDb) {
      return [pokemonsDb];
    } else {
      const { data } = await axios(`${url}/${query.toLowerCase()}`);
      const detailPokemon = pokemonModDetail(data);
      const detailPokemonMod = await pokemonModDetailTypeModel(
        detailPokemon.types,
        Type
      );
      detailPokemon.types = detailPokemonMod;
      return [detailPokemon];
    }
  } catch (error) {
    throw new Error("Pokemons not founds");
  }
};

const createPokemon = async ({
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
}) => {
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createDb: true,
  });
  await newPokemon.addTypes(types);
  const pokemonWithTypes = await Pokemon.findByPk(newPokemon.id, {
    include: {
      model: Type,
      through: {
        attributes: [],
      },
    },
  });
  return pokemonWithTypes;
};

module.exports = {
  getAllPokemons,
  getIdPokemon,
  getNameQuery,
  createPokemon,
};
