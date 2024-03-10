import React from 'react';
import './CarReservation.css';

const CarReservation = () => {
  return (
    <div className="car-reservation">
      <h1>Reservation Details</h1>
      <div className="reservation-form">
        <form>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="john.doe@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="date">Reservation Date:</label>
            <input type="date" id="date" name="date" />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (Hours):</label>
            <input type="number" id="duration" name="duration" min="1" placeholder="1" />
          </div>

          <button type="button">Submit Reservation</button>
        </form>
      </div>
    </div>
  );
};

export default CarReservation;
