import React, { useState } from 'react';
import './SimpleModal.css';

const SimpleModal = ({
  isOpen,
  onClose,
  onConfirm,
  minDate,
  maxDate,
  car,
}) => {
  // Initialize states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [gps, setGps] = useState(false);
  const [safetySeat, setSafetySeat] = useState(false);
  const [fuelService, setFuelService] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [step, setStep] = useState(1); // Control the modal steps
  // Credit card details states
  const [creditCardName, setCreditCardName] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardCVV, setCreditCardCVV] = useState('');
  const [creditCardExpiry, setCreditCardExpiry] = useState('');


  const locationOptions = ['Concordia University Hall building H3G 2E9', 'Concordia Loyola Campus H4B 1R6', 'McGill University ', 'Montreal University H3T 1J4']  ;
  
  // Add state for dropLocation and pickLocation
  const [dropLocation, setDropLocation] = useState('');
  const [pickLocation, setPickLocation] = useState('');
  
  // Reset all states to their initial values and close the modal
  const resetModal = () => {
    setStartDate('');
    setEndDate('');
    setStartTime('00:00');
    setEndTime('23:59');
    setGps(false);
    setSafetySeat(false);
    setFuelService(false);
    setInsurance(false);
    setStep(1);
    setCreditCardName('');
    setCreditCardNumber('');
    setCreditCardCVV('');
    setCreditCardExpiry('');
    onClose(); // Close the modal
  };

  const handleNext = () => {
    setStep(step + 1); // Move to the next step
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1); // Move back to the previous step, if possible
  };

  const additionalServicePrice = 50; // Price for each additional service

  const calculateTotalPrice = () => {
    const startDateObj = new Date(`${startDate}T${startTime}`);
    const endDateObj = new Date(`${endDate}T${endTime}`);
    const diffInMs = endDateObj - startDateObj;
    const diffInHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
    let basePrice = diffInHours * car.price; // Base price calculation

    // Add additional services price
    let additionalServicesCount = 0;
    if (gps) additionalServicesCount++;
    if (safetySeat) additionalServicesCount++;
    if (fuelService) additionalServicesCount++;
    if (insurance) additionalServicesCount++;

    let additionalServicesPrice = additionalServicesCount * additionalServicePrice;
    return basePrice + additionalServicesPrice; // Return total price including additional services
  };

  // When the confirm action is triggered
  const handleConfirm = () => {
    // Pass all the collected details to the onConfirm function
    const totalPrice = calculateTotalPrice();
    onConfirm(
      startDate,
      startTime,
      endDate,
      endTime,
      gps,
      safetySeat,
      fuelService,
      insurance,
      {
        name: creditCardName,
        number: creditCardNumber,
        cvv: creditCardCVV,
        expiry: creditCardExpiry,
      }
    );
    resetModal(); // Reset and close the modal after confirmation
  };

  if (!isOpen) return null;
  
    return (
      <div className="modal-container">
      <h2 className="modal-header">{`${car.make} ${car.model} (${car.year})`} - Reservation Details</h2>
      
      {step === 1 && (
        <div className="modal-content">
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
          <label>Pick-up Location:</label>

<select value={pickLocation} onChange={(e) => setPickLocation(e.target.value)}>
  {locationOptions.map((location) => (
    <option key={location} value={location}>{location}</option>
  ))}
</select>
</div>
<div>
<label>Drop-off Location:</label>
<select value={dropLocation} onChange={(e) => setDropLocation(e.target.value)}>
  {locationOptions.map((location) => (
    <option key={location} value={location}>{location}</option>
  ))}
</select>
          </div>
          <div>
          <h3 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Additional services (50$ per service):</h3>
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
  
          <button onClick={handleNext}>Next</button>
          <button onClick={resetModal}>Cancel</button>
        </div>
        )}
  
  {step === 2 && (
        <form onSubmit={(e) => e.preventDefault()} className="modal-form">
            <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
            <label>Name on Card:</label>
            <input type="text" value={creditCardName} onChange={(e) => setCreditCardName(e.target.value)} />
            <label>Card Number:</label>
            <input type="text" value={creditCardNumber} maxLength="16" onChange={(e) => setCreditCardNumber(e.target.value)} />
            <label>CVV:</label>
            <input type="text" value={creditCardCVV} maxLength="3" onChange={(e) => setCreditCardCVV(e.target.value)} />
            <label>Expiry Date (MM/YY):</label>
            <input type="text" value={creditCardExpiry} placeholder="MM/YY" onChange={(e) => setCreditCardExpiry(e.target.value)} />
            <div>
            <button type="button" onClick={handleBack}>Back</button>
            <button type="button" onClick={handleConfirm}>Confirm</button>
            </div>
          </form>
        )}
      </div>
    );
  };

  export default SimpleModal;
