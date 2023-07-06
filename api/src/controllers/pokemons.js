const { Pokemon, Type } = require("../db");
const { getAllPresentPokemons } = require("../helpers/getPokemons");
const { parsePokemon } = require("../helpers/parsePokemon");
const axios = require("axios");
const { Op } = require("sequelize");

url = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async () => {
  try {
    const { data } = await axios.get(`${url}?limit=48`);

    const urlsMapAxios = data.results.map((p) => axios.get(p.url));
    const dataPokemons = await getAllPresentPokemons(urlsMapAxios);

    return dataPokemons;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getIdPokemon = async (id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    if (data) return parsePokemon(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getNameQuery = async (query) => {
  try {
    const { data } = await axios(`${url}/${query.toLowerCase()}`);

    const AllPokemonsDb = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: query,
        },
      },
    });

    return [parsePokemon(data), ...AllPokemonsDb];
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
