import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import CarBrowsing from './Components/CarBrowsing/CarBrowsing';
import CarReservation from './Components/CarReservation/CarReservation';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Confirmation from './Components/Confirmation/Confirmation';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/browse" element={<ProtectedRoute><CarBrowsing /></ProtectedRoute>} />
        <Route path="/confirmation/:reservationId" element={<Confirmation />} />
        <Route path="/bookcar" element={<ProtectedRoute><CarReservation /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
