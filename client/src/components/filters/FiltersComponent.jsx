import React from "react";
import { useDispatch } from "react-redux";
import { filterByDiet, orderByName, orderByScore } from "../../redux/actions";
import "../filters/FiltersComponent.css"

export default function FiltersComponent ({setCurrentPage, setOrder}) {

    const dispatch = useDispatch();

    function handleFilterByDiets (e) {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
    };

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); 
        setOrder(`OrderBy ${e.target.value}`) 
    }

    function handleOrderByScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1); 
        setOrder(`OrderBy ${e.target.value}`) 
    }


    return(
        <div className="filters">
            <div>
            <label className="filterLabel" htmlFor="filterName" >Filter By Diet: </label>
            <select onChange={e => handleFilterByDiets(e)} className="filterSelect">
                <option value="All" autoFocus >All</option>
                <option value="gluten free">Gluten free</option>
                <option value="dairy free">Dairy free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto vegetarian">Lacto vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                <option value="ovo vegetarian">Ovo vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Fodmap friendly</option>
                <option value="whole 30">Whole 30</option>
            </select>
            </div>
            <div>
            <label className="filterLabel" htmlFor="filterName" >Order By Name: </label>
            <select onChange={e => handleOrderByName(e)} className="filterSelect">
                <option value="none" autoFocus >None</option>
                <option value="des">A-Z</option>
                <option value="asc">Z-A</option>
            </select>
            </div>
            <div>
            <label className="filterLabel" htmlFor="filterHealth" >Order By Health Score: </label>
            <select onChange={e => handleOrderByScore(e)} className="filterSelect">
                <option value="none" autoFocus >None</option>
                <option value="mayor">Higher Score</option>
                <option value="minor">Minor Score</option>
            </select>
            </div>


        </div>
    )
}