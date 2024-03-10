import React from 'react';

const CarCard = ({ car: { id, make, model, year, type, time, price } }) => {
  return (
    <div className="car" key={id}>
      <div>
        <p>{year}</p>
      </div>

      {}
      <div>
        <img src="https://via.placeholder.com/400" alt={`${make} ${model}`} />
      </div>

      <div>
        <span>{type}</span>
        <h3>{`${make} ${model}`}</h3>
        <p>Available: {time}</p>
        <p>Rental Price: ${parseFloat(price).toFixed(2)}/hr</p>
        <button >Book Reservation</button>
      </div>
    </div>
  );
}

export default CarCard;
