import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchDiets, postRecipe } from "../../redux/actions";
import NavBarComponent from "../navBar/NavBarComponent.jsx";

export default function PostRecipeComponent () {

    const diets = useSelector((state)=> state.diets);
    const dispatch = useDispatch();

    //EL USEHISTORY ME MANDA A DONDE YO LE DIGA
    const history = useHistory();

    //PARA QUE ME CARGUE LOS DATOS DE DIETS Y RECIPES SI LA PAG INICIA ACA
    useEffect(()=> {
        dispatch(fetchAllRecipes())
        dispatch(fetchDiets())
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: []
    })
    console.log(input)

    //PARA MANEJAR TODOS LOS CHANGE MENOS EL CHECKBOX
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    };
    //ESTE SE FIJA QUE TENGAS EL TARGET CHECKED
    const handleCheckbox = (e) => {
        if(e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
        console.log("SOY LO QUE ESPERAS", e.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(postRecipe(input))
        alert("Recipe created");
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            steps: "",
            image: "",
            diets: []
        })
        console.log("SOY LO ENVIADO", input)
        history.push("/home")
    };

    return(
        <div>
            <NavBarComponent/>
            <h3>Create Recipe</h3>
            <form onSubmit={(e)=>onSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text" placeholder="Name" autoComplete="off" name="name" value={input.name} onChange={(e)=> handleChange(e)} />
                </div>
                <br />
                <div>
                    <label htmlFor="summary">Summary: </label>
                    <input type="text" placeholder="Summary" autoComplete="off" name="summary" value={input.summary} onChange={(e)=> handleChange(e)}/>
                </div>
                <br />
                <div>
                    <label htmlFor="healthScore">Health Score: </label>
                    <input type="number" placeholder="Ingrese Number" min="1" max="100" name="healthScore" value={input.healthScore} autoComplete="off" onChange={(e)=> handleChange(e)}/>
                </div>
                <br />
                <div>
                    <label htmlFor="image">Image: </label>
                    <input type="url" placeholder="URL..." autoComplete="off" name="image" value={input.image} onChange={(e)=> handleChange(e)}/>
                </div>
                <br />
                <div>
                    <label htmlFor="steps">Steps: </label>
                    <input type="textarea" placeholder="Ingrese steps" autoComplete="off" name="steps" value={input.steps} onChange={(e)=> handleChange(e)}/>
                </div>
                <br />
                <div>
                    <label htmlFor="diets">Select Diets</label>
                    <br />
                    <br />
                    {diets.map((d)=> (
                        <label htmlFor={d.name} key={d.name}>
                        <input type="checkbox" name="diets" value={d.name} onChange={(e)=> handleCheckbox(e)}/>
                        {d.name} {" "}
                        </label>
                    ))}
                </div>
                <br />
                <div>
                    <button>Create Recipe</button>
                </div>
            </form>
            <br />
            <div>
                <Link to="/home">
                    <button>CANCEL</button>
                </Link>
            </div>

        
        </div>
    )
}