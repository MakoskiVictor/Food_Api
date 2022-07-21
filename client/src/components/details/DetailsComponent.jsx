import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipeId } from "../../redux/actions/index.js";
import NavBarComponent from "../navBar/NavBarComponent";
import "../details/DetailsComponent.css"

export default function DetailsComponent (props) {
    //console.log("SOY PROPS", props);
    //const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.details)

    useEffect(() => {
        dispatch(fetchRecipeId(props.match.params.id))
    }, [dispatch]);

    return(
        <div>
            <NavBarComponent/>
            <br />
            <br />
            <div className="details">
                {detail.length > 0?
                    <div>
                        <h1 className="nameDet">{detail[0].name}</h1>
                        <br />
                        <img className="imageDet" src={detail[0].image? detail[0].image 
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU"} 
                            alt="img not found" width="500px" height="500px" />
                            <br />
                <h4>ID: {detail[0].id}</h4>
                <br />
                <h4 className="score">Health Score: {detail[0].healthScore}</h4>
                <br />
                <div className="summaryDet">
                    <p>Summary: {detail[0].summary? detail[0].summary : "Nothing here"} </p>
                </div>
                <br />
                <p className="steps">Steps: {detail[0].steps} </p>
                <br />
                <div className="dietsDet">
                    <ul>Diets: 
                        {detail[0].diets && detail[0].diets.map((r)=> {
                            return( 
                                <p key={r}>{r}</p>
                            )
                        }) 
                        }
                    </ul>
                </div>
                    </div>
                    :
                    <p>LOADING...</p>
                }
            </div>
            <div>
                <Link to="/home">
                    <button className="back">Go Back</button>
                </Link>
            </div>
        </div>
    )
}