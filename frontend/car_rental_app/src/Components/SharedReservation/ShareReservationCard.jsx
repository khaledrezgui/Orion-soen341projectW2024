import React, { useState } from 'react';

const SharedReservationCard = ({ reservation, car, onPay, onCancel }) => {

  if (!car) return null; // Render nothing if car details are not provided

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false
    };
    return new Date(dateString).toLocaleString([], options);
  };

  // Calculate the individual payment amount
  const individualPaymentAmount = reservation.totalPrice / (reservation.sharedUsers.length + 1); // +1 for the original user

  // Handle pay action
  const handlePay = () => {
    onPay(reservation);
  };

  // Handle cancel action
  const handleCancel = () => {
    onCancel(reservation);
  };

  return (
    <div className="reservation-card">
      <h3>Reservation for {car.model} ({car.make} {car.year})</h3>
      <p>Pickup Date: {formatDateTime(reservation.startDate)}</p>
      <p>Return Date: {formatDateTime(reservation.endDate)}</p>
      <p>Amount due: ${individualPaymentAmount.toFixed(2)}</p>
      <p>Selected Additional Services: 
        {reservation.gps && <span> GPS</span>}
        {reservation.safetySeat && <span>, Child Safety Seat</span>}
        {reservation.fuelService && <span>, Fuel Service</span>}
        {reservation.insurance && <span>, Insurance</span>}
      </p>
      <div>
        <button onClick={handlePay} style={{ backgroundColor: '#4CAF50', color: 'white' }}>Pay</button>
        <button onClick={handleCancel} style={{ backgroundColor: '#f44336', color: 'white', marginLeft: '10px' }}>Cancel</button>
      </div>
    </div>
  );
};

export default SharedReservationCard;
