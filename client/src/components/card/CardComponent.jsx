import React from "react";
import { legacy_createStore } from "redux";

export default function CardComponent ({name, summary, healthScore, steps, image, diets, id}) {
    return(
        <div>
            <h3>Name: {name}</h3>
            <img src={image? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU"} alt="img not found" width="250px" height="250px" />
            <h4>ID: {id}</h4>
            <h4>Health Score: {healthScore}</h4>
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