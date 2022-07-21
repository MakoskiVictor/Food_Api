import React from "react";
import { Link } from "react-router-dom";
import "../landingPage/LandingPageComponent.css"

export default function LandingPageComponent () { 
    return (
        <div className="landingP">
            <Link to="/home">
                <button className="landingBtn">To Home</button>
            </Link>
        </div>
    )
}
