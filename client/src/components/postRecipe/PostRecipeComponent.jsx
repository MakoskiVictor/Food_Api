import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchDiets, postRecipe } from "../../redux/actions";
import swal from "sweetalert";
import NavBarComponent from "../navBar/NavBarComponent.jsx";
import axios from "axios";
import "../postRecipe/PostRecipeComponent.css";

export default function PostRecipeComponent() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const c = console.log.bind(document);

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchDiets());
  }, [dispatch]);

  //ESTADO DE LA IMAGEN
  const [imageSelected, setImageSelected] = useState("");

  //ESTADO INPUTS
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: [],
  });

  c(input);
  c(imageSelected);

  //VALIDACIONES
  let validateName = /^[a-zA-Z\s]+$/;
  let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  const validate = (input) => {
    let errors = {};
    if (!input.name.length) {
      errors.name = "This field cannot be empty";
    }
    if (!validateName.test(input.name)) {
      errors.name = "Special characters or numbers are not allowed";
    }
    if (!input.summary.length) {
      errors.summary = "This field cannot be empty";
    }
    if (input.summary.length < 40) {
      errors.summary = "This field must be at least 40 characters";
    }
    if (input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Number required. Must be a number between 1-100";
    }
    if (!input.steps.length) {
      errors.steps = "This field cannot be empty";
    }
    if (input.steps.length < 80) {
      errors.steps = "This field must be longer than 80 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheckbox = (e) => {
    if (e.target.checked && !input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else if (!e.target.checked) {
      setInput({
        ...input,
        diets: input.diets.filter((d) => d !== e.target.value),
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && input.diets.length > 0) {
      if (imageSelected) {
        c("entró a cloudinary");
        let imgCloudinary;
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "goctl1il");

        try {
          await axios
            .post(
              "https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload",
              formData
            )
            .then((response) => {
              imgCloudinary = response.data.secure_url;
            })
            .then(async () => {
              await axios.post(`http://localhost:3001/api/recipes`, {
                name: input.name,
                summary: input.summary,
                healthScore: input.healthScore,
                steps: input.steps,
                image: imgCloudinary,
                diets: input.diets,
              });
            })
            .then(() => {
              swal({
                title: "Recipe created succesfully",
                text: "Do you want to create other one?",
                icon: "success",
                buttons: ["No", "Yes"],
              }).then((response) => {
                if (response) {
                  window.location.reload(true);
                } else {
                  history.push("/home");
                }
              });
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        await axios
          .post(`http://localhost:3001/api/recipes`, input)
          .then(() => {
            swal({
              title: "Recipe created succesfully",
              text: "Do you want to create other one?",
              icon: "success",
              buttons: ["No", "Yes"],
            }).then((response) => {
              if (response) {
                window.location.reload(true);
              } else {
                history.push("/home");
              }
            });
          });
      }
    } else {
      swal({
        title: "All fields must be completed",
        icon: "error",
        buttons: false,
        timer: 2000,
      })
    }
  };

  return (
    <div className="postRecipe">
      <NavBarComponent />
      <h3 className="title">CREATE RECIPE</h3>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="container">
          <label className="labelInp">Name: </label>
          <input
            className="inputSmol"
            type="text"
            autoComplete="off"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          
        </div>
        {errors.name? <p className="error">{errors.name}</p> : <p className="error"></p>}
        <div className="container">
          <label className="labelInp" htmlFor="summary">
            Summary:{" "}
          </label>
          <textarea
          className="input"
            /* className="textbox" */
            type="text"
            placeholder="Summary"
            autoComplete="off"
            name="summary"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />
          
        </div>
        {errors.summary? <p className="error">{errors.summary}</p> : <p className="error"></p>}
        <div className="container">
          <label htmlFor="labelInp" className="labelInp">Health Score: </label>
          <input
            className="inputSmol"
            type="number"
            min="1"
            max="100"
            name="healthScore"
            value={input.healthScore}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          
        </div>
        {errors.healthScore? <p className="error">{errors.healthScore}</p> : <p className="error"></p>}
        <div className="container">
          <label className="labelInp">Image (Optional): </label>
          <input
          className="inputSmolImage"
            type="file"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          />
        </div>
        <div className="container">
          <label className="labelInp" htmlFor="steps">
            Steps:{" "}
          </label>
          <textarea
            /* className="textbox" */
            className="input"
            type="textarea" 
            placeholder="Ingrese steps"
            autoComplete="off"
            name="steps"
            value={input.steps}
            onChange={(e) => handleChange(e)}
          />
          
        </div>
        {errors.steps? <p className="error">{errors.steps}</p> : <p className="error"></p>}
        <div className="checkbox">
          <label htmlFor="diets">Select Diets: </label>
          {diets.map((d) => (
            <label htmlFor={d.name} key={d.name}>
              <input
                type="checkbox"
                name="diets"
                value={d.name}
                onChange={(e) => handleCheckbox(e)}
              />
              {d.name}{" "}
            </label>
          ))}
        </div>
        <div>
          <button className="create">Create Recipe</button>
        </div>
      </form>
      <br />
      <div>
        <Link to="/home">
          <button className="cancel">CANCEL</button>
        </Link>
      </div>
    </div>
  );
}
