import React from 'react';

const CarCard = ({ car: { _id, make, model, year, type, time, price, description, photos, seats } }) => {
  return (
    <div className="car" key={_id}>
      <div>
        <p>{year}</p>
      </div>
      <div>
        <img src={photos.length > 0 ? photos[0] : "https://via.placeholder.com/400"} alt={`${make} ${model}`} />
      </div>
      <div>
        <span>{type}</span>
        <h3>{`${make} ${model}`}</h3>
        <p>Available: {time}</p>
        <p>Rental Price: ${parseFloat(price).toFixed(2)}/hr</p>
        <p>{description}</p>
        <p>Seats: {seats}</p>
        <button>Book Reservation</button>
      </div>
    </div>
  );
}

export default CarCard;
