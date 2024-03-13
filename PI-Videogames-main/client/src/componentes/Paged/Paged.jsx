import React from "react";
//import styles from 'paged.module.css';

export default function Paged(props) {
    const { videoGamesPP, allvideogames, paged} = props;
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allvideogames / videoGamesPP); i++) {
        pageNumbers.push(i);
      }
    
      
      return (
        <nav>
          <ul>
            {pageNumbers && pageNumbers.map(n => (
              <button key={n} className={btn} onClick={() => paged(n)}>{n}</button>
            ))}
          </ul>
        </nav>
      );
}