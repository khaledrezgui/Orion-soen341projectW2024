import React, { useState } from 'react';
import './CheckIn.css';

const CheckIn = () => {
 const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
 });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
 };

 const allYes = Object.values(answers).every(answer => answer === "Yes");

 return (
    <div className='form-container'>
      <h2>Check-In</h2>
      <h4>Pick Up the Car</h4>
      <p>1. Has the customer presented their booking confirmation?</p>
      <input type="radio" name="q1" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q1" value="No" onChange={handleChange} /> No

      <p>2. Does the customer have a valid driver's license?</p>
      <input type="radio" name="q2" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q2" value="No" onChange={handleChange} /> No

      <p>3. Does the customer have the credit card that was used to make the reservation?</p>
      <input type="radio" name="q3" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q3" value="No" onChange={handleChange} /> No

      <h4>Inspect the Car</h4>
      <p>The customer has inspected the car and is satisfied with its condition.</p>
      <input type="radio" name="q4" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q4" value="No" onChange={handleChange} /> No

      <h4>Sign Rental Agreement</h4>
      <p>Does the customer agree to the terms and conditions of the rental?</p>
      <input type="radio" name="q5" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q5" value="No" onChange={handleChange} /> No

      {allYes && (
        <div>
          <label>
            Enter customer signature here:<br/>
            <textarea rows="4" cols="50" />
          </label>
          <button className="confirm-button">Confirm Reservation</button>
        </div>
      )}
    </div>
 );
};

export default CheckIn;
