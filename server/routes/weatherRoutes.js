const express = require('express')
const axios = require('axios')
const router = express.Router()
const weatherHelper= require('../helpers/weatherHelper')
//Initializing instance of weatherHelper class.
let weather = new  weatherHelper()
//Handle get request to /weather/:city
router.get('/:city', (req,res)=>{
weather.getWeather(req.params.city).then((weatherData)=>{
    res.set("Content-Type", "application/json");
    res.status(200).json(weatherData)
})
})

module.exports = router