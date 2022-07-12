//IMPORTAMOS LAS ACTIONS
import { FETCH_ALL_RECIPES, FETCH_RECIPE_NAME, FETCH_RECIPE_ID, POST_RECIPE, FILTER_BY_DIET } from "../actions";

//SETEAMOS EL/LOS ESTADO/S
const initialState = {
    allRecipes: []
};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_RECIPES:
            return {
                ...state,
                allRecipes: action.payload
            }
        case FETCH_RECIPE_NAME:
            return {
                ...state,
                allRecipes: action.payload
            }
        case FETCH_RECIPE_ID:
            return {
                ...state,
                allRecipes: action.payload
            }
        case POST_RECIPE:
            return {
                ...state,
            }
        case FILTER_BY_DIET:
            const allDiets = state.allRecipes;
            const filteredDiets = action.payload === "All" ? allDiets : allDiets.filter(d => d.diets.includes(action.payload));
            console.log("SOY REDUCER", filteredDiets)
            console.log("SOY REDUCER", state.allRecipes)
            return {
                ...state,
                allRecipes: filteredDiets
            }
        default:
            return state
    }
};

