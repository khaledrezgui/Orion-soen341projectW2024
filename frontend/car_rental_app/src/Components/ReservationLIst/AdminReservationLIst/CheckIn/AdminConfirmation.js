import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { message, reservationDetails } = location.state || {};

  return (
    <div>
      <h2>Reservation Confirmation</h2>
      {message && <p>{message}</p>}
      {reservationDetails && (
        <div>
          <p>Car Model: {reservationDetails.carModel}</p>
          <p>Start Date: {new Date(reservationDetails.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(reservationDetails.endDate).toLocaleDateString()}</p>
          <p>GPS: {reservationDetails.gps ? 'Included' : 'Not Included'}</p>
          <p>Child Safety Seat: {reservationDetails.safetySeat ? 'Included' : 'Not Included'}</p>
          <p>Fuel Service: {reservationDetails.fuelService ? 'Included' : 'Not Included'}</p>
          <p>Insurance: {reservationDetails.insurance ? 'Included' : 'Not Included'}</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
