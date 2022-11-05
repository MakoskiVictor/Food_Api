import {BACK_URL} from "../../constantes.js";

export const FETCH_ALL_RECIPES = "FETCH_ALL_RECIPES";
export const FETCH_DIET = "FETCH_DIET";
export const FETCH_RECIPE_NAME = "FETCH_RECIPE_NAME";
export const FETCH_RECIPE_ID = "FETCH_RECIPE_ID";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const DELETE_DETAILS = "DELETE_DETAILS";
console.log("soy backurl", BACK_URL)

export function fetchAllRecipes () {
    return function(dispatch) {
        fetch(`${BACK_URL}/api/recipes`)
        .then(response => response.json())
        .then((recipes)=>{
            dispatch({
                type: FETCH_ALL_RECIPES,
                payload: recipes
            })
        })
        .catch((error) => {
            console.log(error)
        }) 
    }
};

export function fetchRecipeName(name) {
    return function(dispatch){
        fetch(`${BACK_URL}/api/recipes?name=${name}`)
        .then(response => response.json())
        .then((recipe) => {
            dispatch({
                type: FETCH_RECIPE_NAME,
                payload: recipe
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
};

export function fetchRecipeId(id) {
    return function(dispatch) {
        fetch(`${BACK_URL}/api/recipes/${id}`)
        .then(response => response.json())
        .then((recipe) =>{
            dispatch({
                type: FETCH_RECIPE_ID,
                payload: recipe
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
};

export function fetchDiets() {
    return function(dispatch) {
        fetch(`${BACK_URL}/api/diets`)
        .then(response => response.json())
        .then((diet) =>{
            dispatch({
                type: FETCH_DIET,
                payload: diet
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}


export function filterByDiet(payload){
    return{
        type: FILTER_BY_DIET,
        payload
    }
};

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
};

export function deleteDetails() {
    return {
        type: DELETE_DETAILS,
        payload: []
    }
}


export function postRecipe(data) {
    return function(dispatch) {
        fetch(`${BACK_URL}/api/recipes`, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }
    };


