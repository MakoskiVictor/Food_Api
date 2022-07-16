import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import chefImg from "../../assets/chefImg.jpg"
import { Link } from "react-router-dom";
import "./NavBarComponent.css"
import { fetchRecipeName } from "../../redux/actions";

export default function NavBarComponent () {

    //SETEO EL ESTADO DE LA SEARCHBAR
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();


    //RENDERIZO EL ESTADO
    const onInputChange = (e)=> {
        e.preventDefault();
        setSearch(e.target.value)
    }

    //DESPACHO LA BUSQUEDA
    const onSubmit = (e)=> {
        e.preventDefault();
        dispatch(fetchRecipeName(search))
        setSearch("");
    }


    return(
        <div className="NavBarComplete">
            <div>
                <Link to={"/home"}>
                    <img src={chefImg} alt="Not found" width="50px" height="50px" />
                </Link>
            </div>
            <br />
            <div>
                <Link  to={"/create"}>
                    <div>CREATE RECIPE</div>
                </Link>
            </div>
            <br />
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Search Recipe" onChange={onInputChange} value={search}/>
                <input type="submit" value="Search" />
            </form>


        </div>
    )
}