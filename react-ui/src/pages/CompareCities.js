import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import CompareCitySelector from '../components/CompareCitySelector'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../css/CompareCities.css'
function CompareCities() {
    var nav = useNavigate()
  return (
    <div className='compare-cities'>
        <ArrowBackIcon id="back-btn" onClick={()=>nav('/solution')}></ArrowBackIcon>
        
        <CompareCitySelector></CompareCitySelector>
        <CompareCitySelector></CompareCitySelector>
    </div>
  )
}

export default CompareCities