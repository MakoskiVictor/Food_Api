import { legacy_createStore } from "redux";

export const FETCH_ALL_RECIPES = "FETCH_ALL_RECIPES";
export const FETCH_RECIPE_NAME = "FETCH_RECIPE_NAME";
export const FETCH_RECIPE_ID = "FETCH_RECIPE_ID";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

export function fetchAllRecipes () {
    return function(dispatch) {
        fetch(`http://localhost:3001/api/recipes`)
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
        fetch(`http://localhost:3001/api/recipes?name=${name}`)
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
        fetch(`http://localhost:3001/api/recipes/${id}`)
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

export function postRecipe(data) {
    return function(dispatch) {
        fetch(`http://localhost:3001/api/recipes`, {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then((response)=>{
            dispatch({
                type: POST_RECIPE,
                payload: response
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
};

export function filterByDiet(payload){
    console.log("SOY ACTIONS.PAYLOAD", payload)
    return{
        type: FILTER_BY_DIET,
        payload
    }
}