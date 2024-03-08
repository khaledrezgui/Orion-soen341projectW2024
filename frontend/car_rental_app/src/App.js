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

  <div className='car'>
      <div>
        <p>{car1.year}</p>
      </div>
      <div>
        <img src={car1.poster !== "NA" ? car1.poster : 'https://via.placeholder.com/400'} alt = {car1.make}/>
      </div>
      <div>
        <span>
          {car1.price}
        </span>
        <h3>{car1.make}</h3>
      </div>
      
    </div>

  </div>

</div>

  );
}

export default App;
