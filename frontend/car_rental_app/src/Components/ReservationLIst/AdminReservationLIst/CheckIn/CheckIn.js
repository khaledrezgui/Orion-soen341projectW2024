import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TermsAndConditions from './terms';
import './CheckIn.css';

const CheckIn = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null); // Add state for car details

  const additionalServices = [];
  if (reservation?.gps) additionalServices.push('GPS');
  if (reservation?.safetySeat) additionalServices.push('Child Safety Seat');
  if (reservation?.fuelService) additionalServices.push('Fuel Service');
  if (reservation?.insurance) additionalServices.push('Insurance');

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`/reservations/${reservationId}`);
        setReservation(response.data);
        
        const userResponse = await axios.get(`/users/${response.data.user}`);
        setUser(userResponse.data); // Store fetched user details

        const carResponse = await axios.get(`/cars/${response.data.car}`);
        setCar(carResponse.data); // Store fetched car details
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchReservationDetails();
  }, [reservationId]);

  const handleConfirmReservation = () => {

    if (user && user.creditCard && user.creditCard.number) {
      const lastFourDigits = user.creditCard.number.slice(-4);
      navigate(`/ReservationConfirmtion/${reservationId}`, {
        state: {
          message: `$500 CAD were taken from credit card ending with ${lastFourDigits}.`,
          reservationDetails: {
            carModel: 'Model Placeholder',
                   startDate: reservation.startDate,
                    endDate: reservation.endDate,
                    gps: reservation.gps ? 'Included' : 'Not Included',
                    safetySeat: reservation.safetySeat ? 'Included' : 'Not Included',
                    fuelService: reservation.fuelService ? 'Included' : 'Not Included',
                    insurance: reservation.insurance ? 'Included' : 'Not Included',
                    totalPrice: reservation.totalPrice
          }
        }
      });
    } else {
      console.error("Credit card details are not available.");
    }
  };


  const handleCancelReservation = async () => {
    try {
      await axios.delete(`/reservations/${reservationId}`);
      navigate('/browse'); // Navigate back to reservations list or another appropriate page
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
  });

  const [showTerms, setShowTerms] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
  };

  const allYes = Object.values(answers).every(answer => answer === "Yes");

  const handleAcceptTerms = () => {
    setShowTerms(false); // Hide terms
    setShowSignature(true); // Show signature form
  };

  

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

           
      {allYes && !showTerms && !showSignature && (
        <div>
          <button className="terms-button" onClick={() => setShowTerms(true)}>View Terms and Conditions</button>
        </div>
      )}

      {showTerms && (
        <div>
        <TermsAndConditions
          renterName={user?.username}
          renterEmail={user?.email}
          carMake={car?.make}
          carModel={car?.model}
          carYear={car?.year}
          startDate={reservation?.startDate}
          endDate={reservation?.endDate}
          rentalRate={car?.price}
          additionalServices={additionalServices}
        />         <button className="accept-button" onClick={handleAcceptTerms}>Accept</button>
          <button className="decline-button" onClick={() => setShowTerms(false)}>Decline</button>
        </div>
      )}

      {showSignature && (
        <div>
          <label>
            Enter customer signature here:<br />
            <textarea rows="4" cols="50" />
          </label>
          <button className="confirm-button" onClick={handleConfirmReservation}>Confirm Reservation</button>
        </div>
      )}
      <button className = "cancel-btn" onClick={handleCancelReservation}>Cancel Reservation</button>
    </div>
  );
};

export default CheckIn;