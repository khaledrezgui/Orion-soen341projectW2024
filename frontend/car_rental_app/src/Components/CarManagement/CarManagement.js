import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarManagementCard from './CarManagementCard';
import EditCarModal from '../EditCarModal';
import AddCarModal from '../AddCarModal'; // Import AddCarModal
import './CarManagement.css';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to control AddCarModal visibility

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`/cars/${carId}`);
      setCars(cars.filter(car => car._id !== carId));
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  const handleUpdate = (car) => {
    setSelectedCar(car);
    setIsAddModalOpen(false); // Ensure the add modal is closed when updating
    setEditModalOpen(true);
  };

  const handleAddNewCar = () => {
    setIsAddModalOpen(true);
    setEditModalOpen(false); // Ensure the edit modal is closed when adding
  };

  const onEditModalConfirm = async (carDetails) => {
    try {
      await axios.put(`/cars/${selectedCar._id}`, carDetails);
      // Refetch cars to update the list
      const updatedCars = await axios.get('/cars');
      setCars(updatedCars.data);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  const onAddModalConfirm = async (newCarDetails) => {
    try {
      await axios.post('/cars', newCarDetails);
      // Refetch cars to update the list
      const updatedCars = await axios.get('/cars');
      setCars(updatedCars.data);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add new car:', error);
    }
  };

  return (
    <div className="car-management">
    <h2>Car Management</h2>
    <button onClick={handleAddNewCar} className="add-new-car">Add New Car</button>
      <div className="container">
        {cars.map(car => (
          <CarManagementCard
            key={car._id}
            car={car}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      {isEditModalOpen && selectedCar && (
        <EditCarModal
          isOpen={isEditModalOpen}
          car={selectedCar}
          onClose={() => setEditModalOpen(false)}
          onConfirm={onEditModalConfirm}
        />
      )}
      {isAddModalOpen && (
        <AddCarModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onConfirm={onAddModalConfirm} // Here is the corrected prop
        />
      )}
    </div>
  );
};

export default CarManagement;
