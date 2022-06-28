import React from "react";
import { Button } from "@mui/material";
import rsLogo from "./logo-with-name.png";
import "./App.css";
import TeamSelector from "./components/TeamSelector";

import CompareCities from "./pages/CompareCities";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Solution from "./pages/Solution";
function App() {


  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
       <Route path="/solution" element={<Solution/>}/>
       <Route path="/" element={<Home/>}/>
       <Route path="/compare-cities" element={<CompareCities/>}/>
    </Routes>
  
 
        
     
    </div>
    </BrowserRouter>
   
  );
}

export default App;
