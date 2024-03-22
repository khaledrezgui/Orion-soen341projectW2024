import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import SearchIcon from '../../pictures/search.svg';
import "./CarBrowsing.css";
import axios from 'axios';

const CarBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    // Fetch branches
    const fetchBranches = async () => {
      try {
        const response = await axios.get('/branches');
        setBranches(response.data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };
    
    // Fetch cars
    const fetchCars = async () => {
      try {
        const response = await axios.get('/cars');
        setCars(response.data);
        setAllCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchBranches();
    fetchCars();
  }, []);

  // Filter cars based on the search term and selected branch
  const filterCars = () => {
    let filteredCars = allCars.filter((car) =>
      `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedBranch) {
      filteredCars = filteredCars.filter(car => car.branchId === selectedBranch);
    }
    setCars(filteredCars);
  };

  useEffect(() => {
    filterCars();
  }, [searchTerm, selectedBranch]); // Add selectedBranch to dependency array

  return (
    <div className="carbrowsing">
      <h1>Car Rental App</h1>
  
      <div className="search-container">
        <div className="search-input">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for cars"
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={filterCars}
          />
        </div>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select a branch</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>{branch.name}</option>
          ))}
        </select>
      </div>
  
      {cars.length > 0 ? (
        <div className="container">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No cars found</h2>
        </div>
      )}
    </div>
  );
  
};

export default CarBrowsing;
