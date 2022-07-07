const { default: axios } = require('axios');
const { Router } = require('express');
const { Recipe, Diet } = require("../db");
require("dotenv").config

const { API_KEY } = process.env;


const router = Router();
//GET DIET
const getDiets = async ()=> {
    try {
        const dietDb = await Diet.findAll();
        if(dietDb.length === 0) {
/*             const json = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            const diets = json.data.results.map(d => d.diets);
            console.log("SOY DIET Y TRAIGO", diets)
            const eachDiet = diets.map(d =>{
                for(let i=0; i=d.length-1; i++) {return d[i]}
            })
    
            console.log("SOY EACHDIET Y TRAIGO", eachDiet) */
            const types = [
                "gluten free",
                "dairy free",
                "ketogenic",
                "vegetarian",
                "lacto vegetarian",
                "lacto ovo vegetarian",
                "ovo vegetarian",
                "vegan",
                "pescatarian",
                "paleolithic",
                "primal",
                "fodmap friendly",
                "whole 30",
            ];
            types.forEach(d => {
                Diet.findOrCreate({
                    where: { name: d }
                })
            });
            const allDiets = await Diet.findAll();
            return allDiets;
        } else {
            return dietDb;
        }
    } catch (error) {
        console.log("Error in dietsControllers", error)
    }
}





module.exports = {
    getDiets
}