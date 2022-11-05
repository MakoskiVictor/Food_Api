import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipeName } from "../../redux/actions";
import SearchIcon from '@mui/icons-material/Search';
import "../searchBar/SearchBarComponent.css";

export default function SearchBarComponent ({placeholder}) {

        //SETEO EL ESTADO DE LA SEARCHBAR
        const [search, setSearch] = useState("");
        const dispatch = useDispatch();
    
    
        //RENDERIZO EL ESTADO
        const onInputChange = (e)=> {
            e.preventDefault();
            setSearch(e.target.value)
        };
    
        //DESPACHO LA BUSQUEDA
        const onSubmit = (e)=> {
            e.preventDefault();
            dispatch(fetchRecipeName(search))
            setSearch("");
        };

    return(
        <form className="search" onSubmit={onSubmit}>
        <div className="searchInputs">
            <input type="text" autoComplete="off" placeholder={placeholder} onChange={onInputChange}  value={search} id="search"></input>
            <div className="searchIcon"  type="submit"><SearchIcon/></div>
        </div>
    </form>
    )
}
