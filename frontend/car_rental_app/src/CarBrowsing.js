import React, { useState } from "react";
import CarCard from "./CarCard"; 
import SearchIcon from "./pictures/search.svg";
import "./CarBrowsing.css";
import sampleData from './sampleData.json'; 

const CarBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState(sampleData.cars); 

  // Function to filter cars based on the search term
  const searchCars = (term) => {
    const filteredCars = sampleData.cars.filter((car) =>
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
