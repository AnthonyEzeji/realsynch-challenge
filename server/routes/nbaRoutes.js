const express = require('express')
const axios = require('axios')
const router = express.Router()
const nbaHelper = require('../helpers/nbaHelper')

let nba = new nbaHelper()
router.get('/teams', (req,res)=>{
nba.getTeams().then((teams)=>{
    res.set("Content-Type", "application/json");
    res.status(200).json(teams)
})
})


module.exports = router