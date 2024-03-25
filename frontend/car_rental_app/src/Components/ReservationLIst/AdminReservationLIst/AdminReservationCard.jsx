import React from 'react';

const AdminReservationCard = ({ reservation, car, onDelete, onUpdate }) => {
  if (!car) return null; // Render nothing if car details are not provided

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false
    };
    return new Date(dateString).toLocaleString([], options);
  };

  return (
    <div className="reservation-card">
      <h3>Reservation for {car.model} ({car.make} {car.year})</h3>
      <p>Start Date: {formatDateTime(reservation.startDate)}</p>
      <p>End Date: {formatDateTime(reservation.endDate)}</p>
      <div>
        <button>Check In</button>
        <button onClick={() => onUpdate(reservation._id)} style={{ backgroundColor: 'green', color: 'white' }}>Update Reservation</button>
        <button onClick={() => onDelete(reservation._id)} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>Delete Reservation</button>
      </div>
    </div>
  );
};

export default AdminReservationCard;
