import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../redux/actions/index.js";
import CardComponent from "../card/CardComponent.jsx"; 
import PaginationComponent from "../pagination/PaginationComponent.jsx";
import FiltersComponent from "../filters/FiltersComponent.jsx";
import NavBarComponent from "../navBar/NavBarComponent.jsx";
import "../home/HomeComponent.css"

export default function HomeComponent() {

    const allRecipes = useSelector((state)=> state.allRecipes); 
    const dispatch = useDispatch();
    //UN ORDEN PARA LOS FILTROS
    const [order, setOrder] = useState("");
    
    //PARA PAGINADO
    const [currentPage, setCurrentPage] = useState(1); 
    const [recipesPerPage, setRecipesPerPage] = useState(12); 
    const indexOfLastRecipe = currentPage * recipesPerPage; 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; 
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); 


    //CONSTANTE QUE AYUDA CON EL RENDERIZADO
    const paginated = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(fetchAllRecipes());
    }, [dispatch])

    return(
        <div className="home">
            <div>
                <NavBarComponent allRecipes={allRecipes}/>
            </div>
            
            <FiltersComponent state={allRecipes} setOrder={setOrder} setCurrentPage={setCurrentPage} />
            <div>
                <div className="cards">
                    {
                        currentRecipes.length > 0 && currentRecipes? currentRecipes.map( (r, i) => {
                            return( 
                            <CardComponent
                                key={i}
                                id={r.id}
                                name={r.name}
                                image= {r.image}
                                diets= {r.diets}
                                healthScore= {r.healthScore}
                                />
                        )})
                        : <div className="spinnerContainer"><div className="spinner"></div>
                        <p className="SpinnerText">Ups, seems like nothing is here!</p>
                        </div> 
                    }
                </div>

            </div>
            <PaginationComponent
                allRecipes={allRecipes.length} 
                recipesPerPage={recipesPerPage}
                paginated={paginated}
            />
            <br />

            <div className="espacio"></div>
        </div>
    )
}