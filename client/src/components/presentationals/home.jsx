import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllCountries, getCountryOrderBy, getCountryByPopulation, getCountryByContinent, getActivities, getCountryByActivity } from "../../actions/actions.js";
import CountryIndividual from "./countryIndividual.jsx";
import Search from "./search.jsx";
import Paginate from "./paginate.jsx";
import css from './home.module.css';

export default function Home() {

    const dispatch = useDispatch();

    const countries = useSelector(state => state.backendFilteredCountries) // me traigo countries algo del store
    const activities = useSelector(state => state.backendActivities)

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount] = useState(10);

    let result = countries;
    let indexLast = currentPage * pageCount;
    let indexFirst = indexLast - pageCount;
    let currentCountries = result.slice(indexFirst, indexLast);
    
    let allPages = Math.ceil(result.length / pageCount);

    let next = currentPage;
    let prev = currentPage;

    function changePage (page){
        setCurrentPage(page);
    }

    if (currentPage < allPages){
        next = currentPage + 1;
    }

    if (currentPage > 1 ){
        prev = currentPage - 1;
    }

    // De forma similar a componentDidMount y componentDidUpdate
    useEffect(() => {
        // Agarro los paises cuando se renderiza el componente y en cada actualizacion.
        dispatch(actionGetAllCountries()); // lanzo la action
        dispatch(getActivities());
        //dispatch(actionGetAllActivities())
    }, []); // segundo parametro es para comparar si cambio lo que esta dentro del array, y asi optimizar cada update.

    function dispatchOrder(e){
        dispatch(getCountryOrderBy(e.target.value));
    }

    function dispatchOrderPopulation(e){
        dispatch(getCountryByPopulation(e.target.value));
    }

    function dispatchOrderContinent(e){
        dispatch(getCountryByContinent(e.target.value));

    }

    function dispatchActivity(e){
        dispatch(getCountryByActivity(e.target.value));        
    }

    console.log("activities: ");
    console.log(activities);

    return (
        // Main Div
        <div className={css.root}>

            {/* Navbar */}
            <section>
                <div className={css.navbar}>
                    {/* Create Activity */}
                    <Link to="/newActivity">
                        <button>Add new Activity</button>
                    </Link>

            {/*<section>*/}
                {/* Search Country name */}
                <div>
                    <Search />
                </div>
           {/* </section> */}

            {/* Order by  */}
            <select onChange={(e) => dispatchOrder(e)} >
                <option value=""> Order by: </option>
                <option value="AZ"> Ascendente </option>
                <option value="ZA"> Descendente </option>
            </select>
                
            {/* Order by Population  */}
            <select onChange={(e) => dispatchOrderPopulation(e)} >
                <option value=""> Population: </option>
                <option value="MAX"> MAX </option>
                <option value="MIN"> MIN </option>
            </select>

            {/* Order by Continent */}
            <select onChange={(e) => dispatchOrderContinent(e)} >
                <option value="ALL"> All Continents </option>
                <option value="americas"> Americas </option>
                <option value="asia"> Asia </option>
                <option value="antarctic"> Antartida </option>
                <option value="africa"> Africa </option>
                <option value="europe"> Europa </option>
                <option value="oceania"> Oceania </option>
            </select>

            {/* Order by Activities */}
            <select onChange={(e) => dispatchActivity(e)}>
                <option value="ALL"> Any Activity </option>
                    {
                        activities.map((activity) => <option key={activity.id} value={activity.name}> {activity.name} </option>)
                    }
            </select>
            

            </div>
            </section>
            
            {/* Render each component  */}
            <section>
                <div className={css.listOfCountries}>
                    {
                        currentCountries.map(country => {
                                return <Link to={`/countries/${country.id}`} >
                                        <CountryIndividual name={country.name} continent={country.continent} flagimg={country.flagimg} />
                                    </Link>
                        })
                    }
                </div>
            </section>

            {/* Paginate Component */}
            <section>
                <Paginate pageCount={pageCount} result={result.length} changePage={changePage} next={next} prev={prev} />
            </section>
        </div>
    )
}