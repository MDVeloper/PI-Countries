import React from 'react'
import css from './paginate.module.css';

export default function Paginate({pageCount, result, changePage, next, prev}) {
   const pageNumber = [];
   
   for (let i = 1; i <= Math.ceil(result / pageCount); i++){
       pageNumber.push(i)
   }
   return (
    <nav className={css.paginateNav} >
        <ul className={css.p_ul}>
            <button className={css.loader} onClick={() => changePage(prev)} >Before</button>
            {pageNumber.map(number => 
            <li className={css.p_li} key={number} >
                <div className={css.a_li}>
                <button className={css.p_button} onClick={() => changePage(number)} >
                    {number}
                </button>
                </div>
            </li>
                )}
            <button className={css.loader} onClick={() => changePage(next)} > N e x t </button>
        </ul>
    </nav>
)
}