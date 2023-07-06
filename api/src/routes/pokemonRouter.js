const router = require("express").Router();
const {
  getAllPokemons,
  getIdPokemon,
  getNameQuery,
  createPokemon,
} = require("../controllers/pokemons");

router.get("/", async (req, res) => {
  try {
    const allPokemons = await getAllPokemons();
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.get("/name", async (req, res) => {
  try {
    const { pokemon } = req.query;
    const pokemonSearchs = await getNameQuery(pokemon);
    return res.status(200).json(pokemonSearchs);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const pokemon = await getIdPokemon(idPokemon);
    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } =
      req.body;

    if (
      ![name, image, hp, attack, defense, speed, height, weight, types].every(
        Boolean
      )
    )
      throw new Error("Data missing");

    const pokemon = await createPokemon(req.body);
    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
