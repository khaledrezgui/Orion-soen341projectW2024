import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SimpleModal = ({ isOpen, onClose, onConfirm, minDate, maxDate }) => {
  // Initialize date and time states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');

  // Handle confirm action
  const handleConfirm = () => onConfirm(startDate, startTime, endDate, endTime);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'grey', padding: '20px', zIndex: 100 }}>
      <h2 style={{ textAlign: 'center' }}>Select Reservation Dates and Times</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
        <div>
          <label>Start Date: </label>
          <input type="date" value={startDate} min={minDate} max={maxDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label>End Date: </label>
          <input type="date" value={endDate} min={minDate} max={maxDate} onChange={(e) => setEndDate(e.target.value)} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { _id, make, model, year, type, price, description, photos, seats, availability } = car;
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const bookReservation = async (startDate, startTime, endDate, endTime) => {
    closeModal();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      const formattedStartDate = `${startDate}T${startTime}:00Z`;
      const formattedEndDate = `${endDate}T${endTime}:00Z`;

      const response = await axios.post('/reservations', {
        user: userId,
        car: _id,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        navigate(`/confirmation/${response.data._id}`);
      }
    } catch (error) {
      console.error('Reservation error:', error.response?.data || error);
      setErrorMessage('Error during reservation');
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
            <p>Available: {availability.map(a => `${formatDate(a.start)} to ${formatDate(a.end)}`).join(', ')}</p>
            <button onClick={openModal}>Book Reservation</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
          <SimpleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={bookReservation}
          minDate={availability.length ? availability[0].start : ''}
          maxDate={availability.length ? availability[availability.length - 1].end : ''}
         />
        </>
        );
        };

export default CarCard;