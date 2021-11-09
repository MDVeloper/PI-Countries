import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router";
import css from './countryDetail.module.css';

export default function CountryDetail(){
    const [country, setCountry] = useState({});
    const {id} = useParams();

    function getCountryById(id) {
        axios.get('http://localhost:3001/countries/' + id).then((country) => {
            setCountry(country.data);
            console.log(country.data);
        });
    }

    useEffect(() => {
        getCountryById(id);
    }, []);

    return (
        <center>
        <div className={css.cardDetail} >
                <section>
                    <div>
                        <Link to="/countries">
                            <button>Go Home</button>
                        </Link>
                    </div>
                </section>
                <br/>
                
            <div className={css.title}>                
                <p>[{country.id}]</p>
                <p>{country.name}</p>
            </div>

            <div className={css.imgContainer}>
                <img src={country.flagimg} />
            </div>

            <div className={css.container}>
                <p>Continent:</p>
                <p>Capital:</p>
                <p>Sub Region:</p>
                <p>Area:</p>
                <p>Population:</p>
            </div>
            <div className={css.container}>
                <p className={css.textColor}>{country.continent}</p>
                <p className={css.textColor}>{country.capital}</p>
                <p className={css.textColor}>{country.subregion}</p>
                <p className={css.textColor}>{country.area}</p>
                <p className={css.textColor}>{country.population}</p>
            </div>
            
            <div>
                {
                    country.activities?.length > 0 ? (<div className={css.listOfActivities}>{country.activities.map(activity => {
                        return (
                        <p className={css.activityCard}>
                            Activity: <span className={css.textColorTwo}> {activity.name.charAt(0).toUpperCase() + activity.name.slice(1)}</span><br></br>
                            ID: <span className={css.textColorTwo}> {activity.id} </span><br></br>
                            Difficulty: <span className={css.textColorTwo}> {activity.difficulty} </span><br></br>
                            Duration: <span className={css.textColorTwo}> {activity.duration} </span><br></br>
                            Season: <span className={css.textColorTwo}> {activity.season} </span>
                        </p>
                        )
                    }) }</div>) : "no activities found"
                }
            </div>
        </div>
        </center>
    )
}