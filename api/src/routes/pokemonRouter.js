const router = require("express").Router();
const {
  getAllPokemons,
  getIdPokemon,
  getNameQuery,
  createPokemon,
} = require("../controllers/pokemons");

router.get("/", async (req, res, next) => {
  try {
    const allPokemons = await getAllPokemons();
    return res.status(200).json(allPokemons);
  } catch (error) {
    next(error);
  }
});

router.get("/name", async (req, res, next) => {
  try {
    const { pokemon } = req.query;
    const pokemonSearchs = await getNameQuery(pokemon);
    return res.status(200).json(pokemonSearchs);
  } catch (error) {
    next(error);
  }
});

router.get("/:idPokemon", async (req, res, next) => {
  const { idPokemon } = req.params;
  try {
    const pokemon = await getIdPokemon(idPokemon);
    return res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } =
      req.body;

    if (![name, image, hp, attack, defense, types].every(Boolean))
      throw new Error("Data missing");

    await createPokemon(req.body);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
