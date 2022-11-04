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
    /* if (input.image && !validateUrl.test(input.image)) {
      errors.image = "This is not a valid URL";
    }
    if (input.image.length > 100) {
      errors.image = "This URL is too long";
    } */
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
    <div>
      <NavBarComponent />
      <h3 className="title">CREATE RECIPE</h3>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div>
          <label>Name: </label>
          <input
            className="input"
            type="text"
            placeholder="Name"
            autoComplete="off"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <br />
        <div>
          <label className="sumSteps" htmlFor="summary">
            Summary:{" "}
          </label>
          <textarea
            className="textbox"
            type="text"
            placeholder="Summary"
            autoComplete="off"
            name="summary"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <br />
        <div>
          <label htmlFor="healthScore">Health Score: </label>
          <input
            className="inputScore"
            type="number"
            placeholder="Ingrese Number"
            min="1"
            max="100"
            name="healthScore"
            value={input.healthScore}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>
        <br />
        <div className="inputsContainerImg">
          <label className="labelImg">Image (Optional): </label>
          <input
            type="file"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          />
        </div>
        <br />
        <div>
          <label className="sumSteps" htmlFor="steps">
            Steps:{" "}
          </label>
          <textarea
            className="textbox"
            type="textarea"
            placeholder="Ingrese steps"
            autoComplete="off"
            name="steps"
            value={input.steps}
            onChange={(e) => handleChange(e)}
          />
          {errors.steps && <p>{errors.steps}</p>}
        </div>
        <br />
        <div className="checkbox">
          <label htmlFor="diets">Select Diets </label>
          <br />
          <br />
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
        <br />
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
