import React from "react";
import { Link } from "react-router-dom";
import s from './ErrorPage.module.css'



export default function ErrorPage(){


 return (

     <div className={s.container}>
         <div>
         <h1 className={s.h1}>Error 404 Page Not Found!</h1>
         <h2 className={s.h2}> There are no food here 🍕🍙🍨 </h2>
         </div>
        <div className={s.btnDiv}>
        <Link className={s.links} to="/home">
        <button className={s.btn}> Back to home</button>
        </Link>
        </div>
     </div>
 )
}