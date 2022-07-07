const { Router } = require('express');
const recipes = require("./recipes")
const diets = require("./diets")

const router = Router();

router.use("/recipes", recipes);
router.use("/diets", diets);




module.exports = router;
