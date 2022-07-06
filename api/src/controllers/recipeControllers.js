const { Router } = require('express');
const { Recipe, Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;


const router = Router();

//GET ALL RECIPES FOR DB
const getRecipesApi = async ()=> {
    try {
                const getRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
                console.log("SOY GETRECIPES Y TE TRAIGO", getRecipes.data)
                const saveDb = getRecipes.data.results.map((r) =>{
                    return {
                        name: r.title? r.title : "Undefined Name",
                        id: r.id,
                        summary: r.summary? r.summary : "Undefined Summary",
                        healtScore: r.healtScore? r.healtScore : "Undefined Healt Score",
                        steps: r.analyzedInstructions.steps? r.analyzedInstructions.steps : "Undefined steps",
                        image: r.image? r.image : "Undefined Image",
                        diets: r.diets? r.diets : "Undefined diets"
                    }
                })
                console.log("SOY SAVEDB Y TRAIGO", saveDb )

                return saveDb;
    } catch (error) {
        console.log("Error en recipeControllers", error)
    }
}







module.exports = {
    getRecipesApi
}