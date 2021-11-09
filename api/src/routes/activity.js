const { Router } = require('express');
const { Country, Activity } = require('../db.js');

const router = Router();

// Main path
router.post('/', async(req, res, next) => {    
    try {
        const { name, difficulty, duration, season, countriesToAdd } = req.body;

        let activityInstance = await Activity.findOrCreate({
            where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
            }
        });
        /*
        for(let i = 0; i < countriesToAdd.length; i++){
            const countryInstance = await Country.findOne({
                where: {
                    id: countriesToAdd[i],
                }
            });
            console.log(activityInstance)
            await activityInstance[0].addCountry(countryInstance);
            console.log(activityInstance)
        }*/
        // inserción o actualización en la tabla «Country_Activity» viola la llave foránea
        await activityInstance[0].setCountries(countriesToAdd);
       
        res.json(activityInstance);
    }
    catch(error) {
        next(error);
    }
});

// Test
router.get("/", async (req, res, next) => {
    //res.send("activity route it's working");
    try {
        const activitiesInstance = await Activity.findAll({
            include: Country,
        });
        //console.log(activitiesInstance);

        return res.json(activitiesInstance)
    } 
    catch (err) {
        return next(err);
    }
});

module.exports = router;