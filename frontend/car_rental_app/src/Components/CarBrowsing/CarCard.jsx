import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SimpleModal = ({ isOpen, onClose, onConfirm, minDate, maxDate, car }) => {
  // Initialize date and time states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');

  // Addons
  const [gps, setGps] = useState(false);
  const [safetySeat, setSafetySeat] = useState(false);
  const [fuelService, setFuelService] = useState(false);
  const [insurance, setInsurance] = useState(false);

  // Handle confirm action
  const handleConfirm = () => onConfirm(startDate, startTime, endDate, endTime, gps, safetySeat, fuelService, insurance);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'grey', padding: '20px', zIndex: 100,  border: '2px groove black', borderRadius: '10px', boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.7)'}}>
      <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>{`${car.make} ${car.model} (${car.year})`} - Reservation Details</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
        <div>
          <label>Pickup Date: </label>
          <input type="date" value={startDate} min={minDate} max={maxDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label>Return Date: </label>
          <input type="date" value={endDate} min={minDate} max={maxDate} onChange={(e) => setEndDate(e.target.value)} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div>
        <h3 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Additional services:</h3>
        <label>
            <input type="checkbox" checked={gps} onChange={() => setGps(!gps)} />
            GPS
        </label><br />
        <label>
            <input type="checkbox" checked={safetySeat} onChange={() => setSafetySeat(!safetySeat)} />
            Child Safety Seat
        </label><br />
        <label>
            <input type="checkbox" checked={fuelService} onChange={() => setFuelService(!fuelService)} />
            Fuel Service
        </label><br />
        <label>
            <input type="checkbox" checked={insurance} onChange={() => setInsurance(!insurance)} />
            Insurance
        </label><br /> <br />
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
  const { _id, make, model, year, type, price, description, photos, seats } = car;
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const bookReservation = async (startDate, startTime, endDate, endTime, gps, safetySeat, fuelService, insurance) => {
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
        endDate: formattedEndDate,
        gps,
        safetySeat,
        fuelService,
        insurance
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
