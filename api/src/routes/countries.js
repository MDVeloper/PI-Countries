const { Router } = require('express');

const router = Router();

// Main path
router.get('/', (req,res)=>{
    res.send("countries?");
})

module.exports = router;