import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from './Logo.png';
import './NavBar.css'; 

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/browse" className="navbar-logo">
          <img src={logo} alt="App Logo" /> 
        </Link>
        <ul className="nav-menu">
          {isLoggedIn && (
            <li className="nav-item" onClick={handleLogout} style={{cursor: 'pointer'}}>
              <span className="nav-links">Logout</span>
            </li>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
