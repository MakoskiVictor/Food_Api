import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipeName } from "../../redux/actions";
import SearchIcon from '@mui/icons-material/Search';
import "../searchBar/SearchBarComponent.css";
import { FRONT_URL } from "../../constantes";

export default function SearchBarComponent ({placeholder, allRecipes}) {

        const [filteredRecipes, setFilteredRecipes] = useState("");
        //SETEO EL ESTADO DE LA SEARCHBAR
        const [search, setSearch] = useState("");
        const dispatch = useDispatch();

        console.log("SOy recipes", allRecipes)
    
    
        //RENDERIZO EL ESTADO
        const onInputChange = (e)=> {
            e.preventDefault();
            /* setSearch(e.target.value) */
            setFilteredRecipes(e.target.value)
        };
    
        //DESPACHO LA BUSQUEDA
        const onSubmit = (e)=> {
            e.preventDefault();
            dispatch(fetchRecipeName(search))
            setSearch("");
        };

    return(
        <div className="search">
        <div className="searchInputs">
            <input type="text" placeholder={placeholder} onChange={onInputChange} value={search} id="search"/>
            <div className="searchIcon"> <SearchIcon/> </div>
        </div>
        { filteredRecipes != 0 &&
        <div className="dataResult">
            {allRecipes?.map((recipe, index) => {
                return <a key={index} className="dataItem" href={`${FRONT_URL}/details/${recipe.id}`} /* target="_blank" */> 
                <p>{recipe.name}</p>  </a>
            })}
        </div> }
    </div>
    )
}
{/* <form  onSubmit={onSubmit} className="form-wrapper">
<input className="formInput" type="text" placeholder="Search Recipe" onChange={onInputChange} value={search} id="search"/>
<input className="formInput" type="submit" value="Search" id="submit"/>
</form> */}