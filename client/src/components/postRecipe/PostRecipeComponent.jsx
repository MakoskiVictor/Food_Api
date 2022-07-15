import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../redux/actions";
import NavBarComponent from "../navBar/NavBarComponent.jsx";

export default function PostRecipeComponent () {

    const diets = useSelector((state)=> state.diets);
    const dispatch = useDispatch();

    useEffect = (()=> {
        dispatch(fetchAllRecipes())
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: []
    })

    return(
        <div>
            <NavBarComponent/>
            <h3>Create Recipe</h3>
            <form>
                <div>
                    <label>Name: </label>
                    <input type="text" placeholder="Name" autoComplete="off" value={input.name} />
                </div>
                <div>
                    <label htmlFor="summary">Summary: </label>
                    <input type="text" placeholder="Summary" autoComplete="off" value={input.summary}/>
                </div>
                <div>
                    <label htmlFor="healthScore">Health Score: </label>
                    <input type="range" placeholder="Ingrese Number" min="1" max="100" value={input.healthScore} autoComplete="off" />
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <input type="url" placeholder="URL..." autoComplete="off" value={input.image}/>
                </div>
                <div>
                    <label htmlFor="steps">Steps: </label>
                    <input type="textarea" placeholder="Ingrese steps" autoComplete="off" value={input.steps} />
                </div>
                <div>
                    <label htmlFor="diets">Select Diets</label>
                    <br />
                    <br />
                    {diets.map((d)=> (
                        <label htmlFor={d.name} key={d.name}>
                        <input type="checkbox" name={d.name} value={d.value} />
                        {d.name} {" "}
                        </label>
                    ))}
                </div>
                <div>
                    <button>Create Recipe</button>
                </div>
            </form>

        
        </div>
    )
}