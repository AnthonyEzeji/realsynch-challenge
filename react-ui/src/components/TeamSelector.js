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
                    
                    await axios.get(`http://localhost:5000/api/weather/${currTeam.city}`).then((res)=>{
                        setWeather(res.data)
                       }) 
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
        <h5 style={{margin:0}}>{currTeam.full_name}</h5>
 
    
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
            {weather.current.temp_f}F / {weather.current.temp_c}C
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
                    Feels Like
                    </h3>
                    <div className = 'weather-more-fl-bottom'>
                    <p>{weather.current.feelslike_f}F / {weather.current.feelslike_c}C </p>
                    </div>
                </div>
                <div style={{width:"100%"}} className='weather-more-wd'>
                    <h3 className='weather-more-wd-top'>
                  Wind Degree
                    </h3>
                    <div className = 'weather-more-wd-bottom'>
                    <p> {weather.current.wind_degree}</p>
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