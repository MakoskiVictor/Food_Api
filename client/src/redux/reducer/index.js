//IMPORTAMOS LAS ACTIONS
import { FETCH_ALL_RECIPES, FETCH_RECIPE_NAME, FETCH_RECIPE_ID, 
    POST_RECIPE, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, FETCH_DIET, DELETE_DETAILS } from "../actions";

//SETEAMOS EL/LOS ESTADO/S
const initialState = {
    allRecipes: [],
    details: [],
    copyRecipes: [],
    diets: [],
};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_RECIPES:
            return {
                ...state,
                allRecipes: action.payload,
                copyRecipes: action.payload,
            }

        case FETCH_RECIPE_NAME:
            return {
                ...state,
                allRecipes: action.payload
            }

        case FETCH_RECIPE_ID:
            return {
                ...state,
                details: action.payload
            }

        case DELETE_DETAILS:
            return {
                ...state,
                details: action.payload
            }

        case FETCH_DIET:
            return {
                ...state,
                diets: action.payload
            }

        case POST_RECIPE:
            return {
                ...state,
            }

        case FILTER_BY_DIET:

            const allDiets = state.copyRecipes;
            const filteredDiets = action.payload === "All" ? allDiets : allDiets.filter(d => d.diets.includes(action.payload));
            return {
                ...state,
                allRecipes: filteredDiets
            }

        case ORDER_BY_NAME:
            const orderName = action.payload === "none"
            ? state.copyRecipes
            : action.payload === "asc"
            ? state.allRecipes.sort((a, b) => {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            })
            : state.allRecipes.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            return {
                ...state,
                allRecipes: orderName
            }
        
        case ORDER_BY_SCORE:
            const orderScore = action.payload === "none"
            ? state.copyRecipes
            : action.payload === "minor"
            ? state.allRecipes.sort((a, b)=> a.healthScore - b.healthScore)
            : state.allRecipes.sort((a, b)=> b.healthScore - a.healthScore);
            return {
                ...state,
                allRecipes: orderScore
            }



        default:
            return state
    }
};

