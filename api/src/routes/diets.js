const { Router } = require('express');
const { getDiets } = require("../controllers/dietsControllers.js");



const router = Router();

//GET ALL DIETS TO DATABASE
router.get("/", async (req, res, next)=>{
    try {
        const json = await getDiets();
        return res.status(200).json(json);
    } catch (error) {
        next(error)
    }
})


module.exports = router;