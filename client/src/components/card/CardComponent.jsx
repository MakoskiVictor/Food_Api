import React from "react";
import { Link } from "react-router-dom";
import "../card/CardComponent.css"

export default function CardComponent ({name, healthScore, image, diets, id}) {
    return(
        <div className="card">
            <Link to={`/details/${id}`} className="link">
                <div className="divName"> 
                <h3 className="name">{name}</h3>
                </div>
                <img src={image? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU"} alt="img not found" className="imageCard" />
                <h4>Health Score: {healthScore}</h4>
                <div className="dietsCard">
                <ul>Diets: 
                    {diets && diets.map((r)=> {
                        return( 
                            <li key={r} className="diets">{r};</li>
                        )
                    }) 
                    }
                </ul>
                </div>
            </Link>
        </div>
    )
}