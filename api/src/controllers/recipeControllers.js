const { Router } = require('express');
const { Recipe, Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;


const router = Router();
//NUEVO GET RECIPES

const getAllRecipes = async ()=> {
    try {
        //RECIPES DB

        let getRecipeDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributtes: ["name"],
                through: {
                    attributtes: [],
                }
            }
        });


        let filteredRecipeDb = getRecipeDb.map((r) => {
            return {
                id: r.id,
                name: r.name,
                summary: r.summary,
                healthScore: r.healthScore,
                steps: r.steps,
                image: r.image
            }
        });

        console.log("SOY FILTERED", filteredRecipeDb)
        //RECIPES API
        const getRecipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
        const getApi = getRecipesApi.data.results.map((r) =>(
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
        ));

        let allRecipesFounded = [...getApi, ... filteredRecipeDb]

        return allRecipesFounded;
    } catch (error) {
        console.log("Error in recipeControllers", error)
    }
};
///////////////////////////////////////////////////////////////////////////////////////


const getRecipeId = async (id) =>{
    if(id.includes("-")) {
        let getRecipeDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributtes: ["name"],
                through: {
                    attributtes: [],
                }
            }
        });


        let filteredRecipeDb = getRecipeDb.map((r) => {
            return {
                id: r.id,
                name: r.name,
                summary: r.summary,
                healthScore: r.healthScore,
                steps: r.steps,
                image: r.image
            }
        });

        let finalFilter = filteredRecipeDb.filter(r => r.id == id);
        console.log("SOY FINAL FILTER", finalFilter)
        return finalFilter;
    } else {
        //RECIPES API
        const getRecipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
        const getApi = getRecipesApi.data.results.map((r) =>(
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
            finalFilterApi = getApi.filter(r => r.id == id);
            console.log("SOY FINAL FILTER API", finalFilterApi)
            return finalFilterApi;
    }
}




const postRecipe = async (name, summary, healthScore, steps, image, diets)=>{

    try {
        const recipeCreated = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU"
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