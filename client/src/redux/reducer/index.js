//IMPORTAMOS LAS ACTIONS
import { FETCH_ALL_RECIPES, FETCH_RECIPE_NAME, FETCH_RECIPE_ID, POST_RECIPE } from "../actions";

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
        default:
            return state
    }
};

