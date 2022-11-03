import React from "react";
import chefImg from "../../assets/chefImg.jpg"
import { Link } from "react-router-dom";
import "./NavBarComponent.css"
import SearchBarComponent from "../searchBar/SearchBarComponent";

export default function NavBarComponent ({allRecipes}) {
    console.log("soyall recipes nav", allRecipes);

    return(
        <div className="NavBarComplete">
            <div className="logo">
                <Link to={"/home"} /* className="link1" */>
                    <img src={chefImg} alt="Not found" className="image" />
                </Link>
            </div>
            <br />
            <div className="button">
                <Link  to={"/create"} className="link1">
                    <div>CREATE RECIPE</div>
                </Link>
            </div>
            <br />
            <div className="button">
            <Link  to={"/home"} className="link1">
                    <div>HOME</div>
                </Link>
            </div>
            <br />
            <SearchBarComponent allRecipes={allRecipes} placeholder={"Search recipe..."}/>


        </div>
    )
}