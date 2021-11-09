import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionGetAllCountries } from "./../../actions/actions.js";
import axios from 'axios';
import css from './activityPage.module.css';

export default function ActivityPage(){
    const dispatch = useDispatch();

    const backendCountries = useSelector((state) => state.backendCountries);

    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countriesToAdd: [],
    });

    const [error, setError] = useState({});
    /*const [countries, setCountry] = useState([]);*/
    
    /*function getCountries() {
        axios.get("http://localhost:3001/countries").then((response) => {
            setCountry(response.data)
        });
    }*/

    function validating(activity){
        let error = {};

        if (!activity.name) error.name = "Nombre invalido";

        if (!activity.difficulty) error.difficulty = "Dificultad esta vacia";
        
        if (!activity.duration) error.duration = "Duracion esta vacia";

        if (!activity.season) error.season = "Season esta vacia";

        if (activity.countriesToAdd <= 0) error.countries = "No hay paises seleccionados";

        return error;
    }

    useEffect(() => {
        dispatch(actionGetAllCountries()); // despacho la accion en cada render
    }, []);

    function onInputChange(e) {
        setActivity((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })

        setError(validating({
            ...activity,
            [e.target.name]: e.target.value,
        }))
    }

    function addCountryToThisActivity(e){
        e.preventDefault();
        
        setActivity({
            ...activity,
            countriesToAdd: [...activity.countriesToAdd, e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();

        if (Object.keys(error).length > 0 || !activity.name) {
            alert("Error, verifique los campos nuevamente.");
        }
        else{
            axios.post("http://localhost:3001/activity", activity).then(() => alert("Actividad creada correctamente"))
        }
    }

    console.log("-------countries-------");
    console.log(backendCountries);
    console.log("-------activity-------");
    console.log(activity);

    return (
        <center>
        <div className={css.activityPage} >
                <section>
                    <div>
                        <Link to="/countries">
                            <button>Go Home</button>
                        </Link>
                    </div>
                </section>
                <br/>
                <br/>
                <br/>

            <form >
                    <label htmlFor="">Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={activity.name}
                        onChange={(e) => onInputChange(e)}
                    />
                    <br/>
                    {error.name && (<span>{error.name}</span>)}
                    <br/>
                    <br/>
                
                    <label htmlFor="">Difficulty: </label>
                    <select name="difficulty" value={activity.difficulty} onChange={(e) => onInputChange(e)}>
                        <option value=""> Select: </option>
                        <option value="1">Dificultad 1</option>
                        <option value="2">Dificultad 2</option>
                        <option value="3">Dificultad 3</option>
                        <option value="4">Dificultad 4</option>
                        <option value="5">Dificultad 5</option>
                    </select>
                    <br/>
                    {error.difficulty && (<span>{error.difficulty}</span>)}
                    <br/>
                    <br/>
                
                    <label htmlFor="">Duration: </label>
                    <input 
                        type="number" 
                        name="duration" 
                        value={activity.duration} 
                        onChange={(e) => onInputChange(e)}
                    />
                    <br/>
                    {error.duration && (<span>{error.duration}</span>)}
                    <br/>
                    <br/>
               
                    <label htmlFor="">Season: </label>
                    <select name="season" value={activity.season} onChange={(e) => onInputChange(e)}>
                        <option value="">Select: </option>
                        <option value="Verano">Verano</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                        <option value="Otoño">Otoño</option>
                    </select>
                    <br/>
                    {error.season && (<span>{error.season}</span>)}
                    <br/>
                    <br/>

                {/* {country.name} <button onClick={(e) => addCountryToThisActivity(e, country.id)}> Agregar </button> */ }
                <label htmlFor="">Country to add this activity: </label>
                <select name="countriesToAdd" onChange={(e) => addCountryToThisActivity(e)}>
                    {
                        backendCountries?.map((country) => {
                            return (
                                <option key={country.id} value={country.id}> {country.name} </option>
                            )
                        })
                    }
                </select>
                    <br/>
                {error.countries && (<span>{error.countries}</span>)}
                    <br/>
                    <br/>

            </form>
                    <br/>
                    <br/>
            <button onClick={(e) => handleSubmit(e)} > Crear </button>
        </div> 
        </center>
    )
}