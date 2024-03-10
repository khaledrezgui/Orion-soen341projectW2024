import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import CarBrowsing from './Components/CarBrowsing/CarBrowsing';
import CarReservation from './Components/CarReservation/CarReservation';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/browse" element={<CarBrowsing />} />
        <Route path="/bookcar" element={<CarReservation />} />
      </Routes>
    </Router>
  );
}

export default App;
