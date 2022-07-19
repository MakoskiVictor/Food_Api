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
        if(dietDb.length ) {
            return dietDb;
        }
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

            types.map( async (d) => {
                await Diet.findOrCreate({
                    where: { name: d }
                })
            });
            const allDiets = await Diet.findAll();
            return allDiets;
    } catch (error) {
        console.log("Error in dietsControllers", error)
    }
}





module.exports = {
    getDiets
}