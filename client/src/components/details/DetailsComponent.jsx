import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipeId, deleteDetails } from "../../redux/actions/index.js";
import NavBarComponent from "../navBar/NavBarComponent";
import "../details/DetailsComponent.css";

export default function DetailsComponent(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(fetchRecipeId(props.match.params.id));
    dispatch(deleteDetails());
  }, [dispatch]);

  return (
    <div className="detailBack">
      <NavBarComponent />
      <br />
      <br />
      {detail.id ? (
        <div className="details">
          {detail.id.length > 30 ? (
            <div>
              <div>
                <h1 className="nameDet">{detail.name}</h1>
              </div>
              <div>
                <img
                  className="imageDet"
                  src={
                    detail.image
                      ? detail.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU"
                  }
                  alt="img not found"
                  width="500px"
                  height="500px"
                />
              </div>
              <div>
                <p className="score">Health Score: {detail.healthScore}</p>
              </div>
              <div>
                <div className="summaryDet">
                  <p>
                    Summary: {detail.summary ? detail.summary : "Nothing here"}{" "}
                  </p>
                </div>
              </div>
              <div>
                <p className="steps">Steps: {detail.steps} </p>
              </div>
              <div className="dietsDet">
                <ul>
                  Diets:
                  {detail.diets &&
                    detail.diets.map((r, i) => {
                      return <p key={i}>{r.name}</p>;
                    })}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="nameDet">{detail.name}</h1>
              <br />
              <img
                className="imageDet"
                src={
                  detail.image
                    ? detail.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU"
                }
                alt="img not found"
                width="400px"
                height="400px"
              />
              <p className="score">Health Score: {detail.healthScore}</p>
              <div className="summaryDet">
                <p>
                  Summary: {detail.summary ? detail.summary : "Nothing here"}{" "}
                </p>
              </div>
              <p className="steps">Steps: {detail.steps} </p>

              <div className="dietsDet">
                <ul>
                  Diets:
                  {detail.diets &&
                    detail.diets.map((r, i) => {
                      return <p key={i}>{r}</p>;
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>LOADING...</p>
      )}
      <div>
        <Link to="/home">
          <button className="back">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
