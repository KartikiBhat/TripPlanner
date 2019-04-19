const express = require('express');
const trails = require('../models/trails');
let router = express.Router();

router.get('/trails',(req,res,next)=>{
    res.status(200);
    res.json(trails);
})

module.exports = router;