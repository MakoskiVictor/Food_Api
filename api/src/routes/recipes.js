const e = require('express');
const { Router } = require('express');
// Importar todos los routers;
const { getAllRecipes } = require("../controllers/recipeControllers.js")


const router = Router();

// Configurar los routers
router.get("/", async (req, res, next)=>{
    const {name} = req.query
    try {
        const getRecipe = await getAllRecipes();
        console.log("SOY GET RECIPE", getRecipe)
        if(name) {
            //FILTRA DE TODAS LAS RECETAS, las que tengan el name igual al name del query
            //AMBOS LOS BUSCAMOS EN MINUSCULAS PARA QUE MACHEE
            const recipeName = await getRecipe.filter(r => r.name.toLowerCase().includes(name.toLowerCase()))
            return res.status(200).json(recipeName);
        } else {
            //console.log("SOY GET RECIPE", asdd)
            return res.status(200).json(getRecipe);
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;