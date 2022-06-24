import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material';
import '../css/TeamSelector.css'
import {NBAIcons} from 'react-nba-logos'
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
    const [show, setShow] = useState(false)

    const [logo, setLogo] = useState('')

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
                    if(currTeam.city == 'Golden State'){
                        await axios.get(`http://localhost:5000/api/weather/san-francisco`).then((res)=>{
                            setWeather(res.data)
                            console.log(res.data)
                           }) 
                    }else if(currTeam.city == 'Brooklyn'){
                        await axios.get(`http://localhost:5000/api/weather/canarsie`).then((res)=>{
                            setWeather(res.data)
                            console.log(res.data)
                           }) 
                    }else if(currTeam.city == 'Utah'){
                        await axios.get(`http://localhost:5000/api/weather/salt-lake-city`).then((res)=>{
                            setWeather(res.data)
                            console.log(res.data)
                           }) 
                    }
                    else{
                        await axios.get(`http://localhost:5000/api/weather/${currTeam.city}`).then((res)=>{
                            setWeather(res.data)
                            console.log(res.data)
                           }) 
                    }
                    console.log(currTeam.city)
                   
                }
                if(typeof currTeam.abbreviation != 'undefined'){
                            setLogo(`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${currTeam.abbreviation.toLowerCase()}.png`)
                        
                    
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
    

  return show?(
    <div className='selector-container'>
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}><ExitToAppIcon onClick={()=>setShow(false)} style ={{color:'red'}}></ExitToAppIcon></div>
        <h5 style={{margin:0}}>{currTeam.full_name.split(' ')[currTeam.full_name.split(' ').length-1]}</h5>
 
    
        <img src = {logo} style={{height:50,width:50}}></img>
        {
        weather.hasOwnProperty('current')
        &&
        <div  className='weather-display'>

            <div className = 'weather-display-temp'>
            <h3 className = 'weather-display-temp-top'>
            Temperature
            </h3>
            <div className = 'weather-display-temp-bottom'>
                <h5 style={{margin:0}}>{weather.location.name}</h5>
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
                    <p> {weather.current.humidity}%</p>
                    <div style={{width:'95%', border:'1px solid black', margin:10,backgroundColor:'white'}}><div style={{width :`${weather.current.humidity}%`,height:'20px',backgroundColor:"green"}}></div></div>
                    </div>
                </div>
               
              
                
                <Button style={{color:'black'}} onClick={()=>{setMore(false)}}><ExpandLess></ExpandLess></Button>
            </div>}
        </div>
        }
        <div className='selector-btns'>
        <Button style={{color:'grey'}} onClick={()=>{handlePrevClick()}}><ArrowLeftIcon style={{fontSize:'50px'}}></ArrowLeftIcon></Button>
        <Button style={{color:'grey'}}  onClick={()=>{handleNextClick()}}><ArrowRightIcon style={{fontSize:'50px'}}></ArrowRightIcon></Button>
        </div>
       

       
    </div>
  ):<Button  variant="contained"  disableElevation size="large"
  sx={{ m: 2, bgcolor: "#00003C" }} onClick={()=>setShow(true)}>Show Anthony's Solution</Button>
}

export default TeamSelector