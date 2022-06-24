import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material';
import '../css/TeamSelector.css'
function TeamSelector() {
    const [teams, setTeams] = useState([])
    const [currTeam, setCurrTeam] = useState({})
    const [index, setIndex] = useState(0)
    const [weather, setWeather] = useState({})

    useEffect( () => {
        //requests list of nba teams from server
        try {
            async function getTeams(){
                await axios.get('http://localhost:5000/api/nba/teams').then((res)=>{
                    setTeams(res.data.data)
                    setCurrTeam(res.data.data[0])
                    
                })
        }
            getTeams()
        } catch (error) {
            console.log(error)
        }
          
    }, []);

    useEffect( () => {
        //requests list of nba teams from server
        try {
                if(typeof teams[index] !== 'undefined'){
                    setCurrTeam(teams[index])
                } 
        } catch (error) {
            console.log(error)
        }
          
    }, [index]);

    useEffect(() => {
        try {
            async function getWeather(){
                if(typeof teams[0] !== 'undefined'){
                    console.log('hello')
                    await axios.get(`http://localhost:5000/api/weather/${teams[0].city}`).then((res)=>{
                        setWeather(res.data)
                       })
                }
        }
        getWeather()
    } catch (error) {
            console.log(error)
        }
    }, [teams])

    useEffect(() => {
        try {
            async function getWeather(){
                if(typeof currTeam.city !== 'undefined'){
                    console.log(currTeam)
                    await axios.get(`http://localhost:5000/api/weather/${currTeam.city}`).then((res)=>{
                        setWeather(res.data)
                       })
                }
        }
        getWeather()
    } catch (error) {
            console.log(error)
        }
    }, [currTeam])


    function handleNextClick(){
        if(index == teams.length){
            return
        }else{
            setIndex(index+1)
        }
      
        
    }

    function handlePrevClick(){
        if(index == 0){
            return
        }else{
            setIndex(index-1)
        }
    }
    
console.log(weather)
  return (
    <div className='selector-container'>
        <h5 style={{margin:0}}>{currTeam.full_name}</h5>
        {
        weather.hasOwnProperty('current')
        &&
        <div className='weather-display'>
            <p className = 'weather-display-temp'>Current Temp: {weather.current.temp_f}F / {weather.current.temp_c}C</p>
            <div style={{ dispay:'flex', justifyContent:'center',width:'100%',backgroundColor:'grey',margin:0}} className = 'weather-display-skies'>
                <h5 style={{}}>   {weather.current.condition.text}</h5>
                <img src={weather.current.condition.icon}></img>
            </div>
            
        </div>
        }
        <div className='selector-btns'>
        <Button onClick={()=>{handlePrevClick()}}>Prev</Button>
        <Button onClick={()=>{handleNextClick()}}>Next</Button>
        </div>
       
    </div>
  )
}

export default TeamSelector