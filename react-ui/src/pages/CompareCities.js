import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CompareCityLeft from '../components/CompareCityLeft'
import CompareCityRight from '../components/CompareCityRight'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../css/CompareCities.css'
function CompareCities() {
    var nav = useNavigate()
  return (
    <div className='compare-cities'>
        <ArrowBackIcon id="back-btn" onClick={()=>nav('/solution')}></ArrowBackIcon>
        <CompareCityLeft></CompareCityLeft>
        <CompareCityRight></CompareCityRight>
    </div>
  )
}

export default CompareCities