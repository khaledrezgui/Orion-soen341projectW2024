import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from './Logo.png';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/browse" className="navbar-logo">
        <img src={logo} alt="App Logo" /> 
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-links">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-links">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
