const express = require('express')
const axios = require('axios')
const router = express.Router()
const weatherHelper= require('../helpers/weatherHelper')

let weather = new  weatherHelper()

router.get('/:city', (req,res)=>{
weather.getWeather(req.params.city).then((weather)=>{
    res.set("Content-Type", "application/json");
    res.status(200).json(weather)
    
})
})

module.exports = router