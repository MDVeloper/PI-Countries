import React from "react";
import { Link } from 'react-router-dom';
import css from './start.module.css';

export default function Start() {
    return (
        <section>
            <div className={css.start}>
                <div className={css.imgContainer}>
                    <Link to="/countries">
                            <img className={css.img} src="/ready.png" />
                        <p>
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    )
}