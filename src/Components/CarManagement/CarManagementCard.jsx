import React from 'react';

const CarManagementCard = ({ car, onDelete, onUpdate }) => {
  return (
    <div className="car-management-card">
      <h3>{car.make} {car.model} ({car.year})</h3>
      <p>Type: {car.type}</p>
      <p>Price: ${car.price}</p>
      <p>Seats: {car.seats}</p>
      <div className="actions">
        <button onClick={() => onUpdate(car)} className="update-btn">Update Car</button>
        <button onClick={() => onDelete(car._id)} className="delete-btn">Delete Car</button>
      </div>
    </div>
  );
};

export default CarManagementCard;
