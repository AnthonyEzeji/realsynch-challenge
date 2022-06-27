import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TeamSelector from '../components/TeamSelector'
import '../css/Solution.css'

function Solution() {
    var nav = useNavigate()
  return (
    <div className='solution'>
        <TeamSelector></TeamSelector>
        <Button style={{backgroundColor:'grey', color:'white'}} onClick={()=>nav('/compare-cities')}>Compare Temperatures Between Cities!</Button>
    </div>
  )
}

export default Solution