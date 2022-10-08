import './App.css';
import React from 'react'
import{BrowserRouter as Router,Routes,Route, BrowserRouter}from "react-router-dom";
import Form from './Components/Form';
import Portal from './Components/Portal';
import Otp from './Components/Otp';
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/OTPAuthen" element={<Otp/>}/>
          <Route path="/home" element={<Portal/>}/>
      </Routes>
    </Router>
  );
}

export default App;
