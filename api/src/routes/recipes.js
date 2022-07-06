const { Router } = require('express');
// Importar todos los routers;
const {getRecipesApi} = require("../controllers/recipeControllers.js")


const router = Router();

// Configurar los routers
router.get("/", async (req, res, next)=>{
    try {
        const getApi = getRecipesApi()
        res.status(200).json(getApi);
    } catch (error) {
        next(error)
    }
})


module.exports = router;