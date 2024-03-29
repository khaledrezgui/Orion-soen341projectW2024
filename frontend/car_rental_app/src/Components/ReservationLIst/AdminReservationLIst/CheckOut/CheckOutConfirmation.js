import React from 'react';
import { useLocation } from 'react-router-dom';
import './CheckOutConfirmation.css'; 

const CheckOutConfirmation = () => {
  const location = useLocation();
  const { message, reservationDetails } = location.state || {};

  return (
    <div className="confirmation-container">
      <h3 className="confirmation-header">Return Confirmation</h3>
      {message && <p className="confirmation-message">{message}</p>}
      {reservationDetails && (
        <div className="reservation-details">
          <p>Total Price: <span>${reservationDetails.totalPrice.toFixed(2)}</span> </p>
          <p>Car Model: <span>{reservationDetails.carModel}</span></p>
          <p>Start Date: <span>{new Date(reservationDetails.startDate).toDateString()} {new Date(reservationDetails.startDate).toTimeString()}</span> </p>
          <p>End Date: <span>{new Date(reservationDetails.endDate).toDateString()} {new Date(reservationDetails.endDate).toTimeString()}</span></p>
          <p>GPS: <span className={(reservationDetails.gps === true) ? 'included' : 'not-included'}>{(reservationDetails.gps === true) ? 'Included' : 'Not Included'}</span></p>
          <p>Child Safety Seat: <span className={(reservationDetails.safetySeat === true) ? 'included' : 'not-included'}>{(reservationDetails.safetySeat === true) ? 'Included' : 'Not Included'}</span></p>
          <p>Fuel Service: <span className={(reservationDetails.fuelService === true) ? 'included' : 'not-included'}>{(reservationDetails.fuelService === true) ? 'Included' : 'Not Included'}</span></p>
          <p>Insurance: <span className={(reservationDetails.insurance === true) ? 'included' : 'not-included'}>{(reservationDetails.insurance === true) ? 'Included' : 'Not Included'}</span></p>
        </div>
      )}
    </div>
  );
};

export default CheckOutConfirmation;
