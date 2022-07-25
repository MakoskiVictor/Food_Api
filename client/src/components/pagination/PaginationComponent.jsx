import React from "react";
import "./PaginationComponent.css"

export default function PaginationComponent({recipesPerPage, allRecipes, paginated}) {
    const pageNumbers = [];
    
    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i); 
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