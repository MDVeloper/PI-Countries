const { Router } = require('express');

const router = Router();

// Main path
router.get('/', (req,res)=>{
    res.send("activity?");
})

module.exports = router;