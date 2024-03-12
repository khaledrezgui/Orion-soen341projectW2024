import React from 'react';

const CarCard = ({ car: { _id, make, model, year, type, price, description, photos, seats, availability, isAvailable } }) => {
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="car" key={_id}>
      <div>
        <p>{year}</p>
      </div>
      <div>
        <img src={photos.length > 0 ? photos[0] : "https://via.placeholder.com/400"} alt={`${make} ${model}`} style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
      </div>
      <div>
        <span>{type}</span>
        <h3>{`${make} ${model}`}</h3>
        {availability && availability.length > 0 && (
          <p>Availability: From {formatDate(availability[0].start)} to {formatDate(availability[0].end)}</p>
        )}
        <p>Rental Price: ${parseFloat(price).toFixed(2)}/hr</p>
        <p>{description}</p>
        <p>Seats: {seats}</p>
        {isAvailable ? (
          <button>Book Reservation</button>
        ) : (
          <p style={{ color: 'red' }}>Car already rented</p>
        )}
      </div>
    </div>
  );
}

export default CarCard;
