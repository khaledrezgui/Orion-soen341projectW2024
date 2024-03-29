import React from 'react';
import { useLocation } from 'react-router-dom';
import './AdminConfirmation.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { message, reservationDetails } = location.state || {};

  return (
    <div className="confirmation-container">
    <h2>Reservation Confirmation (After CheckIn) </h2>
    {message && <p className="confirmation-message">{message}</p>}
    {reservationDetails && (
      <div className="reservation-details">
        <p>Total Price: <span>${reservationDetails.totalPrice.toFixed(2)}</span></p>
        <p>Car Model: <span>{reservationDetails.carModel}</span></p>
        <p>Start Date: <span>{new Date(reservationDetails.startDate).toDateString()} {new Date(reservationDetails.startDate).toTimeString()}</span></p>
        <p>End Date: <span>{new Date(reservationDetails.endDate).toDateString()} {new Date(reservationDetails.endDate).toTimeString()}</span></p>
        <p>GPS: <span className={reservationDetails.gps ? 'included' : 'not-included'}>{reservationDetails.gps ? 'Included' : 'Not Included'}</span></p>
        <p>Child Safety Seat: <span className={reservationDetails.safetySeat ? 'included' : 'not-included'}>{reservationDetails.safetySeat ? 'Included' : 'Not Included'}</span></p>
        <p>Fuel Service: <span className={reservationDetails.fuelService ? 'included' : 'not-included'}>{reservationDetails.fuelService ? 'Included' : 'Not Included'}</span></p>
        <p>Insurance: <span className={reservationDetails.insurance ? 'included' : 'not-included'}>{reservationDetails.insurance ? 'Included' : 'Not Included'}</span></p>
      </div>
    )}
  </div>
  );
};

export default ConfirmationPage;
