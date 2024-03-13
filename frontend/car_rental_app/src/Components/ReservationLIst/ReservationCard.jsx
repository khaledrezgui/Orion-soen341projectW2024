import React from 'react';

const ReservationCard = ({ reservation, car, onDelete, onUpdate }) => {
  if (!car) return null; // Render nothing if car details are not provided

  return (
    <div className="reservation-card">
      <h3>Reservation for {car.model} ({car.make} {car.year})</h3>
      <p>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>
      <div>
        <button onClick={onUpdate} style={{ backgroundColor: 'green', color: 'white' }}>Update Reservation</button>
        <button onClick={onDelete} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>Delete Reservation</button>
      </div>
    </div>
  );
};

export default ReservationCard;
