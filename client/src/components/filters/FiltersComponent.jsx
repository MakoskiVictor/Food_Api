import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiet } from "../../redux/actions";

export default function FiltersComponent () {
/*     const allRecipes = useSelector(state => state.allRecipes)
    const [filter, setFilter] = useState([]) */
    const dispatch = useDispatch();
    function handleFilterByDiets (e) {
        dispatch(filterByDiet(e.target.value));
        console.log(e.target.value)
    }


    return(
        <div>
            <div>
            <select name="select" onChange={e => handleFilterByDiets(e)}>
                <option value="All">All</option>
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


        </div>
    )
}