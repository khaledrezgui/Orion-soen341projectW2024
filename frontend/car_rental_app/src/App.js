import React, { useEffect, useState } from 'react';
import './App.css';
import sampleData from './sampleData.json'; 
import searchIcon from './search.svg';
import CarCard from './CarCard';

const car1 =       {
  "make": "Toyota",
  "model": "Corolla",
  "year": 2017,
  "time": "Morning",
  "type": "Convertible",
  "price": "$47.24/hr",
  "poster" : "NA"
}

function App() {

  const[cars, setCars] = useState([]);

  const searchCars = (title) => {
    // Filter the cars array for the car make that matches the title
    const filteredCars = sampleData.cars.filter(car => car.make === title);

    setCars(filteredCars); 
  }

  useEffect(() => {
    searchCars('Toyota');
  }, [])

  return (

<div className="app">

  <h1>Car Rental</h1>
  <div className="search">
    <input 
    placeholder='Search For Cars'
    value=""
    onChange={() => {}}
    />
    <img 
    src={searchIcon}
    alt='search'
    onClick={() => {}}
    />
  </div>

  <div className='container'>

    <CarCard car1={cars[0]} />

  </div>

</div>

  );
}

export default App;
