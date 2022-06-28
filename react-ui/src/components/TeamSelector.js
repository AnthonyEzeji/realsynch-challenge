import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, MenuItem, Select } from '@mui/material';
import '../css/TeamSelector.css'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
function TeamSelector() {
    const [teams, setTeams] = useState([])
    const [currTeam, setCurrTeam] = useState({})
    const [index, setIndex] = useState(0)
    const [weather, setWeather] = useState({})
    const [more, setMore] = useState(false)
    const [open, setOpen] = useState(false)
    const [showWeather, setShowWeather] = useState(false)
    const [logo, setLogo] = useState('')

    
//Get list of NBA teams from server
    async function getTeams(){
        if(open){
            setOpen(false)
        }else if(!open){
            if(weather.hasOwnProperty('current')&&showWeather==false){
                setShowWeather(true)
            }
            await axios.get('http://localhost:5000/api/nba/teams').then((res)=>{
                setTeams(res.data.data.map((team)=>{return {abbreviation:team.abbreviation,city:team.city,name:team.name}}))
                
               
            })
            setOpen(true)
        }
       
        
    }
//When a list item is selected it will be saved in state as the current team
function handleTeamClick(e){
 
    if(e.target.id.length>0){
   
        setCurrTeam(JSON.parse(e.target.id))
    }
   
}

//When the city property of the current team is defined, a request for weather data in that city will be sent to the server.
useEffect(() => {
    
    async function getWeather(){
        if(typeof currTeam.city !== 'undefined'){
            if(currTeam.city == 'Golden State'){
                let req = await axios.get(`http://localhost:5000/api/weather/san-francisco`).then(res=>{
                    
                    setWeather(res.data)
                    setShowWeather(true)
                })

            }else if(currTeam.city == 'Brooklyn'){
                let req = await axios.get(`http://localhost:5000/api/weather/canarsie`).then(res=>{
                  
                    setWeather(res.data)
                    setShowWeather(true)
                })
            }else if(currTeam.city == 'Utah'){
                let req = await axios.get(`http://localhost:5000/api/weather/${currTeam.city}`).then(res=>{
                
                setWeather(res.data)
                setShowWeather(true)
            })
            }else{
                let req = await axios.get(`http://localhost:5000/api/weather/${currTeam.city}`).then(res=>{
               
                    setWeather(res.data)
                    setShowWeather(true)
                })
            }
            
        }
     
    
    }
  getWeather()
}, [currTeam])




  return (
    <div style={{display:'flex', flexDirection:'column', width:"fit-content", padding:'20px', justifyContent:'center', alignItems:'center'}} >
        <Button style={{width:345}} id="show-team-btn" onClick={()=>getTeams()}>Show Teams</Button>

      {open&&<ul style={{height:200, overflowY:'auto', justifyContent:'flex-start', padding:0}}>
        {teams.map((team,index)=>{
            
            return (<li key={index} style={{justifyContent:'flex-start'}}  onClick={(e)=>handleTeamClick(e)} className = 'menu-item' id={JSON.stringify({abbreviation:team.abbreviation,city:team.city, name:team.name})}><img id={JSON.stringify({abbreviation:team.abbreviation,city:team.city, name:team.name})} style={{height:50, width:50}} src = {`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${team.abbreviation.toLowerCase()}.png`}></img><p id={JSON.stringify({abbreviation:team.abbreviation,city:team.city, name:team.name})}>{team.city + " " + team.name}</p></li>)
        })}
      </ul>}
      
    {showWeather&& <div style={{padding:'20px'}} className='container'>
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}><ExitToAppIcon onClick={()=>setShowWeather(false)} ></ExitToAppIcon></div>
        {typeof currTeam.name!= 'undefined' &&<h5 style={{margin:0}}>{currTeam.name.split(' ')[currTeam.name.split(' ').length-1]}</h5>}
 
    
        <img src = {`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${currTeam.abbreviation.toLowerCase()}.png`} style={{height:50,width:50}}></img>
        {
        weather.hasOwnProperty('current')
        &&
        <div  className='weather-display'>

            <div className = 'weather-display-temp'>
            <h3 className = 'weather-display-temp-top'>
            Temperature
            </h3>
            <div className = 'weather-display-temp-bottom'>
                <h5 style={{margin:0}}>{currTeam.city}</h5>
            <p>{weather.current.temp_f}F / {weather.current.temp_c}C</p>
            <p style={{fontSize:'12px', color:'white'}}>last updated: {weather.current.last_updated}</p>
            </div>
             </div>

            <div  className = 'weather-display-sky'>
                 <h3 className = 'weather-display-sky-top'>Sky</h3>
            <div className = 'weather-display-sky-bottom' style={{display:'flex'}}>
            <p style={{}}>{weather.current.condition.text}</p>
                <img src={weather.current.condition.icon}></img>
            </div>
                
            </div>
            {
            !more
            &&
            <Button onClick = {()=>{setMore(true)}} style={{color:'grey'}}><ExpandMore></ExpandMore></Button>
            }
            {
            more
            &&
            <div  className = 'weather-more-container'>
                <div style={{width:"100%"}} className='weather-more-fl'>
                    <h3 className='weather-more-fl-top'>
                    Feels
                    </h3>
                    <div className = 'weather-more-fl-bottom'>
                    
                    {(weather.current.feelslike_f-weather.current.temp_f).toFixed(2)>0&&<p>{(weather.current.feelslike_f-weather.current.temp_f).toFixed(1)}F/ {(weather.current.feelslike_c-weather.current.temp_c).toFixed(1)}C warmer </p>}
                    {(weather.current.feelslike_f-weather.current.temp_f).toFixed(2)<0&&<p>{Math.abs(weather.current.feelslike_f-weather.current.temp_f).toFixed(1)}F/ {Math.abs(weather.current.feelslike_c-weather.current.temp_c).toFixed(1)}C cooler </p>}
                    {(weather.current.feelslike_f-weather.current.temp_f).toFixed(2)==0&&<p>{Math.abs(weather.current.feelslike_f-weather.current.temp_f).toFixed(1)}F/ {Math.abs(weather.current.feelslike_c-weather.current.temp_c).toFixed(1)}C warmer</p>}

                    </div>
                </div>
                <div style={{width:"100%"}} className='weather-more-humidity'>
                    <h3 className='weather-more-humidity-top'>
                  Humidity
                    </h3>
                    <div className = 'weather-more-humidity-bottom'>
                    <p style ={{margin:0}}> {weather.current.humidity}%</p>
                    <div style={{width:'95%',borderRadius:20, border:'1px solid black', margin:10,backgroundColor:'white'}}><div style={{width :`${weather.current.humidity}%`,height:'20px',backgroundColor:"grey", borderRadius:20}}></div></div>
                    </div>
                </div>
               
              
                
                <Button style={{color:'black'}} onClick={()=>{setMore(false)}}><ExpandLess></ExpandLess></Button>
            </div>}
        </div>
        }
        <div className='selector-btns'>
        
        </div>
       

       
    </div>}
       
       
    </div>
  )
}

export default TeamSelector