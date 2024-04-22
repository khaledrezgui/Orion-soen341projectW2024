import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import CarBrowsing from './Components/CarBrowsing/CarBrowsing';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from './Components/ProtectedRoute/ProtectedAdminRoute';
import Confirmation from './Components/Confirmation/Confirmation';
import ReservationConfirmation from './Components/SharedReservation/ReservationCofirmation';
import ReservationList from './Components/ReservationLIst/ReservationList';
import CarManagement from './Components/CarManagement/CarManagement';
import UserManagement from './Components/UserManagement/UserManagement';
import AdminReservationList from './Components/ReservationLIst/AdminReservationLIst/AdminReservationList';
import CheckIn from './Components/ReservationLIst/AdminReservationLIst/CheckIn/CheckIn';
import CheckOut from './Components/ReservationLIst/AdminReservationLIst/CheckOut/CheckOut';
import NavBar from './Components/NavBar/NavBar';
import AdminConfirmation from './Components/ReservationLIst/AdminReservationLIst/CheckIn/AdminConfirmation';
import CheckOutConfirmation from './Components/ReservationLIst/AdminReservationLIst/CheckOut/CheckOutConfirmation';
import SharedReservationList from './Components/SharedReservation/SharedReservationList';

function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/browse" element={<ProtectedRoute><CarBrowsing /></ProtectedRoute>} />
        <Route path="/confirmation/:reservationId" element={<ProtectedRoute><Confirmation /> </ProtectedRoute>} />
        <Route path="/reservationlist" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
        <Route path="/adminreservationlist" element={<ProtectedAdminRoute><AdminReservationList /></ProtectedAdminRoute>} />
        <Route path="/carmanagement" element={<ProtectedAdminRoute><CarManagement /></ProtectedAdminRoute>} />
        
        <Route path="/sharedreseervation" element={<ProtectedRoute><SharedReservationList /></ProtectedRoute>} />

        <Route path="/sharedreseervationconfirmation/:reservationId" element={<ProtectedRoute><ReservationConfirmation /></ProtectedRoute>} />

        <Route path="/usermanagement" element={<ProtectedAdminRoute><UserManagement /></ProtectedAdminRoute>} />
        <Route path="/checkin/:reservationId" element={<ProtectedAdminRoute><CheckIn /></ProtectedAdminRoute>} />
        <Route path="/checkout/:reservationId" element={<ProtectedAdminRoute><CheckOut /></ProtectedAdminRoute>} />
        <Route path="/ReservationConfirmtion/:reservationId" element={<ProtectedAdminRoute><AdminConfirmation /></ProtectedAdminRoute>} />
        <Route path="/checkoutconfirmation/:reservationId" element={<ProtectedAdminRoute><CheckOutConfirmation /></ProtectedAdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
