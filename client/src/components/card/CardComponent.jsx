import React from "react";
import { legacy_createStore } from "redux";

export default function CardComponent ({name, summary, healthScore, steps, image, diets, id}) {
    console.log("SOY CARD COMPONENT", name, id, image, diets)
    return(
        <div>
            <h3>Name: {name}</h3>
            <img src={image} alt="img not found" width="250px" height="250px" />
            <ul>Diets: 
                {diets && diets.map((r)=> {
                    return( 
                        <li key={r}>{r}</li>
                    )
                }) 
                }
            </ul>
        </div>
    )
}