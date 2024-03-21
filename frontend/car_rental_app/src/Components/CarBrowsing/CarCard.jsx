import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Function to format date to "yyyy-MM-dd"
const toInputDateValue = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};


const SimpleModal = ({ isOpen, onClose, onConfirm, minDate, maxDate }) => {
  // Format dates to "yyyy-MM-dd" for input values
  const [startDate, setStartDate] = useState(toInputDateValue(minDate));
 const [endDate, setEndDate] = useState(toInputDateValue(maxDate));
 const [startTime, setStartTime] = useState('00:00');
 const [endTime, setEndTime] = useState('23:59');


  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'grey', padding: '20px', zIndex: 100 }}>
      <h2 style={{ textAlign: 'center' }}>Select Reservation Dates and Times</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
          <div>
            <label>Pickup Date and Time: </label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          
            
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <div>
            <label>Return Date and Time: </label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <button onClick={() => onConfirm(startDate, endDate, startTime, endTime)} style={{ marginRight: '10px', padding: '5px 15px', backgroundColor: '#04AA6D', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Confirm</button>
        <button onClick={onClose} style={{ padding: '5px 15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>

  );
};
const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { _id, make, model, year, type, price, description, photos, seats, availability, isAvailable } = car;
  const [errorMessage, setErrorMessage] = useState('');
 
  const formatDate = (dateString) => {
     const options = { year: 'numeric', month: 'long', day: 'numeric' };
     return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const openModal = () => {
   setModalOpen(true);
 };
 
 const closeModal = () => {
   setModalOpen(false);
 };
 
  const validateDatesWithinAvailability = (start, end) => {
     const startDate = new Date(start);
     const endDate = new Date(end);
 
     return !availability.some(a => {
       const availableStart = new Date(a.start);
       const availableEnd = new Date(a.end);
       return (startDate >= availableStart && startDate < availableEnd) ||
              (endDate > availableStart && endDate <= availableEnd) ||
              (startDate <= availableStart && endDate >= availableEnd);
     });
  };
 
  const bookReservation = async (startDate, endDate, startTime, endTime) => {
     closeModal();
 
     if (!validateDatesWithinAvailability(startDate, endDate)) {
       setErrorMessage('Car already rented for the selected period.');
       return; 
     }
 
     const token = localStorage.getItem('token');
     if (!token) {
       console.error('No token found');
       return;
     }
 
     const decodedToken = jwtDecode(token);
     const userId = decodedToken.id;
 
     try {
       const formattedStartDate = new Date(`${startDate}T${startTime}`).toISOString();
       const formattedEndDate = new Date(`${endDate}T${endTime}`).toISOString();
 
       const response = await axios.post('/reservations', {
         user: userId,
         car: _id,
         startDate: formattedStartDate,
         endDate: formattedEndDate,
         
       }, {
         headers: {
           Authorization: `Bearer ${token}`,
         }
       });
 
       if (response.status === 201) {
         navigate(`/confirmation/${response.data._id}`);
       }
     } catch (error) {
       console.error('Reservation error:', error.response?.data || 'Error during reservation');
       setErrorMessage('Car not available for selected time period.');
     }
  };
 
  return (
     <>
       <div className="car" key={_id}>
         <div>
           <p>{year}</p>
         </div>
         <div>
           <img src={photos.length > 0 ? photos[0] : "https://via.placeholder.com/400"} alt={`${make} ${model}`} style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
         </div>
         <div>
           <span>{type}</span>
           <h3>{`${make} ${model}`}</h3>
           <p>Available: {availability.map(a => `${formatDate(a.start)} to ${formatDate(a.end)}`).join(', ')}</p>
           <p>Rental Price: ${parseFloat(price).toFixed(2)}/hr</p>
           <p>{description}</p>
           <p>Seats: {seats}</p>
           <button onClick={openModal}>Book Reservation</button>
           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
         </div>
       </div>
       <SimpleModal
         isOpen={isModalOpen}
         onClose={closeModal}
         onConfirm={bookReservation}
         minDate={availability[0]?.start}
         maxDate={availability[0]?.end}
       />
     </>
  );
 };
 
 export default CarCard;
 
 