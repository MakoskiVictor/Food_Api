const { Router } = require('express');
const { Recipe, Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;


const router = Router();

//GET ALL RECIPES 
const getRecipesApi = async ()=> {
    try {
        const getRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=2`);
        const getApi = getRecipes.data.results.map((r) =>(
            {
                name: r.title,
                id: r.id,
                summary: r.summary,
                healthScore: r.healthScore,
                steps: r.analyzedInstructions[0]?.steps.map((each)=>{
                    return each.step
                }),
                image: r.image,
                diets: r.diets
            }
        ))
        //console.log("SOY RETURN API", getApi)
        return getApi;
    } catch (error) {
        console.log("Error in recipeControllers", error)
    }
}

const getRecipesDb = async () =>{
    try {
        const db = await Recipe.findAll({
            include: {
                model: Diet,
                attributtes: ["name"],
                through: {
                    attributtes: [],
                }
            }
        }) 
        const findRecipe = db?.map((r)=>{
            return{
                id,
                name,
                summary,
                healtScore,
                steps,
                image
            }
        })
        return findRecipe;
    } catch (error) {
        console.log("Error in recipeControllers", error)
    }
}


const getAllRecipes = async ()=> {
    try {
        const getAllApi = await getRecipesApi();
        const getAllDb = await getRecipesDb();
        const AllRecipes = getAllApi.concat(getAllDb);
        return AllRecipes;
    } catch (error) {
        console.log("Error in recipeControllers", error)
    }
}




module.exports = {
    getAllRecipes,
}