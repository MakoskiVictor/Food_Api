import React from "react";
import "./PaginationComponent.css"

export default function PaginationComponent({recipesPerPage, allRecipes, paginated}) {
    const pageNumbers = [];
    //EL CICLO FOR ME REDONDEA LA CANTIDAD DE PAGINAS QUE NECESITO
    for(let i=0; i<=Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav className="pagination">
            <ul className="paginated">
                { pageNumbers?.map((number)=>{
                    return( 
                    <li className="number">
                            <button className="pageButton" onClick={() => paginated(number)}>{number}</button>
                    </li>
                )})}
            </ul>
        </nav>
    )
}