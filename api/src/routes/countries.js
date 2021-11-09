const { Router } = require('express');
const axios = require("axios");
const { Country, Activity, Country_Activity } = require('../db.js');
const { Op } = require('sequelize')

const router = Router();

// Main Function
async function getCountries(req, res, next) {
    try {
        const localDb = await Country.findAll();
        
        //console.log(localDb.length);
        if (localDb.length <= 0) {
            let apiObject = await axios.get("https://restcountries.com/v3/all");

            apiObject = apiObject.data.map(element => {
                return Country.create({ 
                    id: element.cca3,
                    name: element.name.official,
                    flagimg: element.flags[1],
                    continent: element.region,
                    capital: element.capital?.length ? element.capital[0] : "No Capital Recognized yet",
                    subregion: element.subregion,
                    area: element.area,
                    population: element.population,
                }) // return
            }) // map
            Promise.all(apiObject).then(resp => next()); // Pedazo de chota, me lo trae vacio sino
        } // !localDb
        else {
            return next();
        }
    }
    catch (err) {
        next({ msg: "Error en la carga de API/DB" });
    }
}

// Main path
router.get('/', getCountries, async(req, res, next) =>{
    const { name } = req.query;

    try {
        //console.log(Boolean(name));
        if(!name){
            const localDb = await Country.findAll({
                attributes: ["id", "name", "flagimg", "continent", "population"],
                include: Activity, // el include me hace el JOIN para traer dato de otra tabla (en este caso el modelo Activity);
            });
            return res.send(localDb);
        } // !name

        const localDb2 = await Country.findAll({
            attributes: ["id", "name", "flagimg", "capital", "continent", "population"],
            where: {
                name: {
                    [Op.iLike]: `%${name}%` // donde coincida la busqueda (con fix de mayus iLike %sarasa%)
                }
            },
            include: Activity
        }) // findAll

        //console.log(localDb2.length);
        if(localDb2.length >= 1) {
            return res.json(localDb2)
        }
        else {
            return res.send("Pais no encontrado")
        }
    }
    catch (err) {
        return next(err);
    }
})

// :id path
router.get('/:id', getCountries, async (req, res, next) => {
    let { id } = req.params;
    id = id.toLocaleUpperCase();

    try {
        if (id){
            let countryInstance = await Country.findByPk(id, {
                include: {
                    model: Activity} 
                })
            //console.log(countryInstance);
            return res.json(countryInstance ? countryInstance : { msg: "La key no pertenece a un pais existente" }
        );
        }
        else {
            res.sendStatus(404).json({ msg: "No se reconocio el id, vuelve a intentarlo" });
        }
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;