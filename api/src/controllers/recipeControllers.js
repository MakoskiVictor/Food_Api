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
                summary: r.summary.replace(/<[^>]+>/g, ''),
                healthScore: r.healthScore,
                steps: r.analyzedInstructions[0]?.steps.map((each)=>{
                    return each.step
                }),
                image: r.image,
                diets: r.diets
            }
        ))
        return getApi;
    } catch (error) {
        console.log("Error in recipeControllers", error)
    }
};

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
        //console.log("SOY findRecipe", findRecipe)
        return findRecipe;
    } catch (error) {
        console.log("Error in recipeControllers", error)
    }
};


const getAllRecipes = async ()=> {
    try {
        const getAllApi = await getRecipesApi();
        const getAllDb = await getRecipesDb();
        const AllRecipes = getAllApi.concat(getAllDb);
        return AllRecipes;
    } catch (error) {
        console.log("Error in recipeControllers get recipe", error)
    }
};

const getRecipeId = async (id) =>{
    try {
        const json = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=2`);
        const recipeId = await json.data.results.filter(r => r.id == id);

        const response = recipeId.map((r) =>(
            {
                name: r.title,
                id: r.id,
                summary: r.summary.replace(/<[^>]+>/g, ''),
                healthScore: r.healthScore,
                steps: r.analyzedInstructions[0]?.steps.map((each)=>{
                    return each.step
                }),
                image: r.image,
                diets: r.diets
            }
        ))

        return response;
    } catch (error) {
        console.log("Error in recipeControllers per id", error)
    }
};

const postRecipe = async (name, summary, healthScore, steps, image, diets)=>{
    try {
        const recipeCreated = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image
        })
    
        const dietsDb = await Diet.findAll({
            where: {name: diets}
        })
        recipeCreated.addDiets(dietsDb);
        return recipeCreated;
    } catch (error) {
        console.log("Error in recipe controllers post", error);
    }
};





module.exports = {
    getAllRecipes, 
    postRecipe,
    getRecipeId
}