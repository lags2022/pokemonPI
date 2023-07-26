const router = require("express").Router();
const { getTypes } = require("../controllers/types");

router.get("/", async (req, res, next) => {
  try {
    const types = await getTypes();
    return res.status(200).json(types);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
