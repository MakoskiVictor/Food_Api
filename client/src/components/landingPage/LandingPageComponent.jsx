import React from "react";
import { Link } from "react-router-dom";

export default function LandingPageComponent () { 
    return (
        <div>
            <h2>Landing Page</h2>
            <Link to="/home">
                <button>To Home</button>
            </Link>
        </div>
    )
}
