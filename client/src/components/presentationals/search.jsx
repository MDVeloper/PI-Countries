import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "./../../actions/actions.js";
import css from './home.module.css';

export default function Search(){

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    function handleOnChange(e){
        e.preventDefault();
        
        setName(e.target.value);
    }

    function handleOnSubmit(){

        dispatch(getCountryByName(name));
        setName("");
    }

    return (
        <div className={css.search}> 
            <form>
                <h2>Search by name:</h2>
                <input type="text" name="name" placeholder="Argentina..." onChange={(e) => handleOnChange(e)}/>
            </form>

            <button className={css.searchButton} type="submit" onClick={() => handleOnSubmit()}> Search </button>
        </div>
    )
}