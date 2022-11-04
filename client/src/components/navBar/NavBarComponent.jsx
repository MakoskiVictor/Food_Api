import React from "react";
import chefImg from "../../assets/chefImg.jpg"
import { Link } from "react-router-dom";
import "./NavBarComponent.css"
import SearchBarComponent from "../searchBar/SearchBarComponent";

export default function NavBarComponent () {


    return(
        <div className="NavBarComplete">
            <div className="logo">
                <Link to={"/home"}>
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
            <SearchBarComponent placeholder={"Search recipe..."}/>


        </div>
    )
}