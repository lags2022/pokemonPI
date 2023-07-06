const router = require("express").Router();
const axios = require("axios");
const { Type } = require("../db");

const url = "https://pokeapi.co/api/v2/type";

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(url);

    const types = await Type.findAll();

    if (!types.length && data) {
      const dataParse = data.results.map((type) => {
        return {
          name: type.name,
        };
      });
      const createTypes = await Type.bulkCreate(dataParse);
      return res.status(200).json(createTypes);
    }

    return res.status(200).json(types);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
