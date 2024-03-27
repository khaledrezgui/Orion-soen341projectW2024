import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckOut.css';

const CheckOut = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [user, setUser] = useState(null); // Add state to store user details

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`/reservations/${reservationId}`);
        setReservation(response.data);
        // After fetching reservation, fetch user details
        const userResponse = await axios.get(`/users/${response.data.user}`);
        setUser(userResponse.data); // Store fetched user details
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchReservationDetails();
  }, [reservationId]);

  const handleConfirmCheckout = async () => {

    if (user && user.creditCard && user.creditCard.number) {

        const lastFourDigits = user.creditCard.number.slice(-4);
        navigate(`/checkoutconfirmation/${reservationId}`, {
            state: {
              message: `CAD $${reservation.totalPrice.toFixed(2)} were taken from credit card ending with ${lastFourDigits}. CAD $500 were sent back to the bank.`,
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
          await axios.delete(`/reservations/${reservationId}`);
    } else {
      console.error("Error deleting the reservation.");
    }
  };


  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
  };

  const allYes = Object.values(answers).every(answer => answer === "Yes");  

 return (
    <div className='form-container'>
      <h2>Check-Out</h2>
      <h4>Return the Car</h4>
      <p>1. Has the customer returned the car with no damage?</p>
      <input type="radio" name="q1" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q1" value="No" onChange={handleChange} /> No

      <p>2. Does the customer have the receipt of the reservation?</p>
      <input type="radio" name="q2" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q2" value="No" onChange={handleChange} /> No

      <p>3. Does the customer have the credit card that was used to make the reservation?</p>
      <input type="radio" name="q3" value="Yes" onChange={handleChange} /> Yes
      <input type="radio" name="q3" value="No" onChange={handleChange} /> No

           
      {allYes && (
        <div>
          <button className="confirm-button" onClick={handleConfirmCheckout}>Confirm Return</button>
        </div>
      )}
      
    </div>
  );
};

export default CheckOut;