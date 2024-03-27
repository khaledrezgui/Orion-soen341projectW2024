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
    photoURL: car?.photos && car.photos.length ? car.photos[0] : '',
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
      photos: [formState.photoURL],
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
        <label>Photo URL:</label>
        <input name="photoURL" value={formState.photoURL} onChange={handleChange} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="button" onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
          <button type="submit" style={{ backgroundColor: '#04AA6D', color: 'white' }}>Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditCarModal;
