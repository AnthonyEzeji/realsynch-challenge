import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
    var nav  = useNavigate()
  return (
    <div style={{display:"flex", width:"100vw", height:'100vh', justifyContent:'center', alignItems:'center'}}><Button variant='contained' style={{ backgroundColor:'grey'}} onClick={()=>{nav('/solution')}}>Solution</Button></div>
  )
}

export default Home