const { Router } = require('express');
const recipes = require("./recipes")
const diets = require("./diets")
const recipe = require("./recipePerId")

const router = Router();

router.use("/recipes", recipes);
router.use("/recipe", recipe);
router.use("/diets", diets);




module.exports = router;
