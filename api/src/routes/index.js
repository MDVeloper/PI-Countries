const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoute = require('./countries.js');
const activityRoute = require('./activity.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriesRoute)
router.use('/activity', activityRoute)

// Main path
router.get('/', (req,res)=>{
    res.send("index?");
})

module.exports = router;
