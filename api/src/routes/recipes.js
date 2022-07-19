const { Router } = require('express');
// Importar todos los routers;
const { getAllRecipes, postRecipe, getRecipeId } = require("../controllers/recipeControllers.js")


const router = Router();

// Configurar los routers
router.get("/", async (req, res, next)=>{
    const {name} = req.query

    try {
        if(name) {
            const getRecipe = await getAllRecipes();
            //FILTRA DE TODAS LAS RECETAS, las que tengan el name igual al name del query
            //AMBOS LOS BUSCAMOS EN MINUSCULAS PARA QUE MACHEE
            //EL INCLUDES ME BUSCA TAMBIEN LOS NOMBRES PARECIDOS, POR ESO USAMOS INCLUDES Y NO ===
            const recipeName = await getRecipe.filter(r => r.name.toLowerCase().includes(name.toLowerCase()))
            return res.status(200).json(recipeName);
        } else {
            const getRecipe = await getAllRecipes();
            return res.status(200).json(getRecipe);
        }
    } catch (error) {
        next(error)
    }
});

//GET RECIPE PER ID
router.get("/:id", async (req, res, next)=>{
    const { id } = req.params;
    try {
        const getPerId = await getRecipeId(id);
        res.status(200).json(getPerId);
    } catch (error) {
        next(error);
    }
});


//POST RECIPE

router.post("/", async (req, res, next)=>{
    const { name, summary, healthScore, steps, image, diets } = req.body;

    try {
        const recipeDb = await postRecipe(name, summary, healthScore, steps, image, diets);
        return res.status(201).json(recipeDb);
    } catch (error) {
        next(error);
    }
})


module.exports = router;