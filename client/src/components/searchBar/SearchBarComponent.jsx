import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipeName } from "../../redux/actions";
import "../searchBar/SearchBarComponent.css";

export default function SearchBarComponent () {

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
        <form  onSubmit={onSubmit} className="form-wrapper">
        <input className="formInput" type="text" placeholder="Search Recipe" onChange={onInputChange} value={search} id="search"/>
        <input className="formInput" type="submit" value="Search" id="submit"/>
    </form>
    )
}