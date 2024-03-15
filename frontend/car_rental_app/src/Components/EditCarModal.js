import React, { useState } from 'react';

const EditCarModal = ({ isOpen, onClose, car, onConfirm }) => {
  const [formState, setFormState] = useState({
    make: car?.make || '',
    model: car?.model || '',
    year: car?.year || '',
    type: car?.type || '',
    description: car?.description || '',
    price: car?.price.toString() || '',
    seats: car?.seats.toString() || '',
    availabilityStart: car?.availability && car.availability.length ? new Date(car.availability[0].start).toISOString().split('T')[0] : '',
    availabilityEnd: car?.availability && car.availability.length ? new Date(car.availability[0].end).toISOString().split('T')[0] : '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCar = {
      ...formState,
      price: parseFloat(formState.price),
      seats: parseInt(formState.seats, 10),
      availability: [{
        start: new Date(formState.availabilityStart),
        end: new Date(formState.availabilityEnd),
      }]
    };
    onConfirm(updatedCar);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <h2>Edit Car Details</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Make:</label>
        <input name="make" value={formState.make} onChange={handleChange} />
        <label>Model:</label>
        <input name="model" value={formState.model} onChange={handleChange} />
        <label>Year:</label>
        <input name="year" value={formState.year} onChange={handleChange} />
        <label>Type:</label>
        <input name="type" value={formState.type} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={formState.description} onChange={handleChange} />
        <label>Price:</label>
        <input name="price" type="number" value={formState.price} onChange={handleChange} />
        <label>Seats:</label>
        <input name="seats" type="number" value={formState.seats} onChange={handleChange} />
        <label>Availability Start:</label>
        <input name="availabilityStart" type="date" value={formState.availabilityStart} onChange={handleChange} />
        <label>Availability End:</label>
        <input name="availabilityEnd" type="date" value={formState.availabilityEnd} onChange={handleChange} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="button" onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
          <button type="submit" style={{ backgroundColor: '#04AA6D', color: 'white' }}>Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditCarModal;
