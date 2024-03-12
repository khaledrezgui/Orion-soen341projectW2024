import React, { useState, useEffect } from "react";
import CarCard from "./CarCard"; 
import SearchIcon from '../../pictures/search.svg';
import "./CarBrowsing.css";
import axios from 'axios'; 

const CarBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]); // Store all fetched cars

  useEffect(() => {
    // Fetch cars from the backend when the component mounts
    const fetchCars = async () => {
      try {
        const response = await axios.get('/cars'); // Adjust the URL as needed
        setCars(response.data);
        setAllCars(response.data); // Keep a copy of all cars for filtering
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Function to filter cars based on the search term
  const searchCars = (term) => {
    if (!term) {
      setCars(allCars); // If the search term is empty, reset to show all cars
      return;
    }
    const filteredCars = allCars.filter((car) =>
      `${car.make} ${car.model}`.toLowerCase().includes(term.toLowerCase())
    );
    setCars(filteredCars);
  };

  return (
    <div className="carbrowsing">
      <h1>Car Rental App</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for cars"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchCars(searchTerm)}
        />
      </div>

      {cars?.length > 0 ? (
        <div className="container">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} /> // Render CarCard for each car
          ))}
        </div>
      ) : ( // If no matching cars 
        <div className="empty"> 
          <h2>No cars found</h2> 
        </div>
      )}
    </div>
  );
};

export default CarBrowsing;
