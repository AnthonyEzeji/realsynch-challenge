import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TeamSelector from '../components/TeamSelector'
import '../css/Solution.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function Solution() {
    var nav = useNavigate()
  return (
    <div className='solution'>
              <ArrowBackIcon id="back-btn" onClick={()=>nav('/')}></ArrowBackIcon>
        <TeamSelector></TeamSelector>
        <Button style={{backgroundColor:'grey', color:'white'}} onClick={()=>nav('/compare-cities')}>Compare Temperatures Between Cities!</Button>
    </div>
  )
}

export default Solution