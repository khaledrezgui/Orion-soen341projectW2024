import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminReservationCard = ({ reservation, car, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  if (!car) return null; // Render nothing if car details are not provided
 
 
  const handleCheckIn = () => {
    navigate('/CheckIn'); // Assuming '/checkin' is the route to the CheckInPage
  };
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
      <p>Pickup Date: {formatDateTime(reservation.startDate)}</p>
      <p>Return Date: {formatDateTime(reservation.endDate)}</p>
      <p>Selected Additional Services: 
                {reservation.gps && <span> GPS</span>}
                {reservation.safetySeat && <span>, Child Safety Seat</span>}
                {reservation.fuelService && <span>, Fuel Service</span>}
                {reservation.insurance && <span>, Insurance</span>}
      </p>
      <div>
        <button onClick={handleCheckIn} class="checkin-btn">Check In</button>
        <button onClick={() => onUpdate(reservation._id)} class="update-btn">Update Reservation</button>
        <button onClick={() => onDelete(reservation._id)} class="delete-btn">Delete Reservation</button>
      </div>
    </div>
  );
};

export default AdminReservationCard;
