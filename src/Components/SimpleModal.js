import React, { useState } from 'react';

const SimpleModal = ({ isOpen, onClose, onConfirm, minDate, maxDate }) => {
  // Initialize start and end date states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Initialize start and end time states
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');

  if (!isOpen) {
    return null;
  }

  // Extend the onConfirm function to include time
  const handleConfirm = () => {
    onConfirm(startDate, startTime, endDate, endTime);
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'grey', padding: '20px', zIndex: 100 }}>
      <h2 style={{ textAlign: 'center' }}>Select Reservation Dates and Times</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Start Date and Time: </label>
          <input type="date" value={startDate} min={minDate} max={maxDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>End Date and Time: </label>
          <input type="date" value={endDate} min={minDate} max={maxDate} onChange={(e) => setEndDate(e.target.value)} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button onClick={handleConfirm} style={{ marginRight: '10px', padding: '5px 15px', backgroundColor: '#04AA6D', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Confirm</button>
        <button onClick={onClose} style={{ padding: '5px 15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  );
};

export default SimpleModal;
