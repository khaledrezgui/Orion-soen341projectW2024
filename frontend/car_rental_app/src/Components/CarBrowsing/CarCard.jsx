import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import SimpleModal from './SimpleModal';
import './SimpleModal.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { _id, make, model, year, type, price, description, photos, seats } = car;
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const bookReservation = async (startDate, startTime, endDate, endTime, gps, safetySeat, fuelService, insurance, creditCardDetails) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
  
    try {
      // First, update the user's credit card details
      const updateResponse = await axios.put(`/users/${userId}`, {
        creditCard: {
          name: creditCardDetails.name,
          number: creditCardDetails.number,
          cvv: creditCardDetails.cvv,
          expiry: creditCardDetails.expiry,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (updateResponse.status !== 200) {
        console.error('Failed to update user details');
        setErrorMessage('Failed to update payment information.');
        return;
      }
      // Then, create the reservation
      const formattedStartDate = `${startDate}T${startTime}:00Z`;
      const formattedEndDate = `${endDate}T${endTime}:00Z`;
  
      const response = await axios.post('/reservations', {
        user: userId,
        car: _id,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        gps,
        safetySeat,
        fuelService,
        insurance,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        navigate(`/confirmation/${response.data._id}`);
      }
    } catch (error) {
      console.error('Reservation error:', error.response?.data || error);
      setErrorMessage('Car already reserved for that time slot.');
    }
  };

  return (
    <>
      <div className="car" key={_id}>
        <div>
          <img src={photos.length > 0 ? photos[0] : "https://via.placeholder.com/400"} alt={`${make} ${model}`} style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
        </div>
        <div>
            <h3>{`${make} ${model} (${year})`}</h3>
            <p>Type: {type}</p>
            <p>Seats: {seats}</p>
            <p>Rental Price: ${parseFloat(price).toFixed(2)}/hr</p>
            <p>Description: {description}</p>
            <button onClick={openModal}>Book Reservation</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      </div>
      <SimpleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={bookReservation}
        car={car}
      />
    </>
  );
};

export default CarCard;
