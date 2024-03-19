import React, { useState } from 'react';

const AddCarModal = ({ isOpen, onClose, onConfirm }) => {
  // Initialize form state for a new car
  const [formState, setFormState] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    description: '',
    price: '',
    seats: '',
    availabilityStart: '',
    availabilityEnd: '',
    photos: [],
    isAvailable: true,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "photos") {
      setFormState(prevState => ({ ...prevState, [name]: [value] }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      ...formState,
      price: parseFloat(formState.price),
      seats: parseInt(formState.seats, 10),
      availability: formState.availabilityStart && formState.availabilityEnd ? [{
        start: new Date(formState.availabilityStart),
        end: new Date(formState.availabilityEnd),
      }] : [],
      photos: formState.photos.filter(photo => photo !== ''), // Filter out empty strings if any
    };
    onConfirm(newCar);
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <h2>Add New Car</h2>
        <form onSubmit={handleSubmit}>
          <label>Make:</label>
          <input name="make" value={formState.make} onChange={handleChange} />
          
          <label>Model:</label>
          <input name="model" value={formState.model} onChange={handleChange} />
          
          <label>Year:</label>
          <input name="year" type="number" value={formState.year} onChange={handleChange} />
          
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

          <label>Photo URLs:</label>
          <input name="photos" value={formState.photos[0] || ''} onChange={handleChange} placeholder="Enter image URL" />

          <div className="actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Car</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
