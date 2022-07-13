import React from "react";
import "./PaginationComponent.css"

export default function PaginationComponent({recipesPerPage, allRecipes, paginated}) {
    const pageNumbers = [];
    //EL CICLO FOR ME REDONDEA LA CANTIDAD DE PAGINAS QUE NECESITO
    for(let i=0; i<=Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i+1); // el i+1 es para que inicie en la pag 1, si no lo ponemos inicia en pag 0
    };

    return(
        <nav className="pagination">
            <ul className="paginated">
                { pageNumbers?.map((number)=>{
                    return( 
                    <li className="number" key={number}>
                            <button className="pageButton" onClick={() => paginated(number)}>{number}</button>
                    </li>
                )})}
            </ul>
        </nav>
    )
};