const { Router } = require('express');
const axios = require("axios");

const router = Router();

const getCountriesFromApi = async() => {
    const countries = await axios.get("https://restcountries.com/v3/all");
    
    //console.log(countries.data);
    //console.log(typeof countries);
    // Por cada obj q vaya tocando, lo reemplazo por uno nuevo con solo las cosas que nos interesan.
    const countriesResponse = await countries.data.map(element => {
        return{
            id: element.cca3,
            name: element.name.official,
            flagimg: element.flags[1],
            continent: element.region,
            capital: element.capital ? [0] : "No Capital Recognized yet",
            subregion: element.subregion,
            area: element.area,
            population: element.population,
        }
    })

    //if (countriesResponse.length > 250)
        // agregar en la base de datos del 250 en adelante.

    console.log(countriesResponse.length);        
    return countriesResponse;
}

// Main path
router.get('/', async(req,res) =>{
    //res.send("countries?");
    const countries = await getCountriesFromApi();
    
    //console.log(countries);

    return res.status(200).send(countries);
})

module.exports = router;