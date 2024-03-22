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
  const [postalOrAirportCode, setPostalOrAirportCode] = useState("");
  const [selectedBranchObject, setSelectedBranchObject] = useState(null);

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

  useEffect(() => {
    const branch = branches.find(branch => branch._id === selectedBranch);
    setSelectedBranchObject(branch);
  }, [selectedBranch, branches]);

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

  // Example implementation using pseudo-code. You'll need to replace this with real API calls.
async function geocodePostalOrAirportCode(code) {
  // This is a placeholder function. You need to replace it with actual geocoding logic.
  // For example, you could use a geocoding API to convert the code to lat/lng.
  console.log(`Geocoding for code: ${code}`);
  // Return mock coordinates (latitude and longitude)
  return { lat: 45.5017, lng: -73.5673 }; // Example coordinates for Montreal
}

async function findNearestBranch(lat, lng) {
  // This is a placeholder function. You should implement logic to find the nearest branch.
  // Perhaps make a call to your backend API that calculates the nearest branch based on lat/lng.
  console.log(`Finding nearest branch for coordinates: ${lat}, ${lng}`);
  // Return mock branch ID (this would be dynamic based on actual nearest branch logic)
  
  return "65fb9e287900386958743b6b"; // Example branch ID
}


const handleFindBranch = async () => {
  try {
    const { lat, lng } = await geocodePostalOrAirportCode(postalOrAirportCode);
    const nearestBranchId = await findNearestBranch(lat, lng);

    // Assuming the `branches` state holds all the branches data
    const nearestBranch = branches.find(branch => branch._id === nearestBranchId);
    if (nearestBranch) {
      setSelectedBranch(nearestBranch._id);
      // This will trigger the useEffect hook to update `selectedBranchObject`
    } else {
      console.error("Nearest branch not found");
    }
  } catch (error) {
    console.error("Error finding nearest branch:", error);
  }
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
        <input
          value={postalOrAirportCode}
          onChange={(e) => setPostalOrAirportCode(e.target.value)}
          placeholder="Postal Code or Airport Code"
        />
        <button onClick={handleFindBranch}>Find Nearest Branch</button>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select a branch</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>{branch.name}</option>
          ))}
        </select>
      </div>
      <div className="selected-branch">
          <h2>Selected Branch: {selectedBranchObject ? selectedBranchObject.name : 'None'}</h2>
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
