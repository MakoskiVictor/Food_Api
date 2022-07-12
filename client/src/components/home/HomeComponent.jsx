import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../redux/actions/index.js";
import CardComponent from "../card/CardComponent.jsx"; //AGREGUÉ EL JSX
import PaginationComponent from "../pagination/PaginationComponent.jsx";
import FiltersComponent from "../filters/FiltersComponent.jsx";

export default function HomeComponent() {

    const allRecipes = useSelector((state)=> state.allRecipes); //TRAE EL ESTADO DEL REDUCER
    const dispatch = useDispatch();
    //PARA PAGINADO, SETEAMOS VARIOS ESTADOS LOCALES
    //UN ESTADO CON LA PAG ACTUAL Y OTRO QUE SETEE LA PAG ACTUAL
    const [currentPage, setCurrentPage] = useState(1); //INICIA EN LA PAG 1
    const [recipesPerPage, setRecipesPerPage] = useState(9); //INDICAMOS CUANTAS RECETAS QUEREMOS POR PAG
    const indexOfLastRecipe = currentPage * recipesPerPage; //ES EL INDICE DE LA ULTIMA RECIPE EN LA PAGINA
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //INDICE DE LA PRIMERA RECIPE EN LA PAG
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //RECIPES ACTUALES

    //SETEAMOS UNA CONSTANTE QUE ME AYUDARA CON EL RENDERIZADO
    const paginated = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(fetchAllRecipes());
    }, [dispatch])

    return(
        <div>
            <h2>HOME</h2>
            <FiltersComponent state={allRecipes}/>
            {
                currentRecipes?.map( (r) => {
                    return( 
                    <CardComponent
                        key={r.id}
                        name={r.name}
                        image= {r.image}
                        diets= {r.diets}
                        />
                )})
            }
            <PaginationComponent
                allRecipes={allRecipes.length} //.length porque necesito un valor numerico
                recipesPerPage={recipesPerPage}
                paginated={paginated}
            />
        </div>
    )
}