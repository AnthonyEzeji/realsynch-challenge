import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
    var nav  = useNavigate()
  return (
    <div><Button onClick={()=>{nav('/solution')}}>Solution</Button></div>
  )
}

export default Home