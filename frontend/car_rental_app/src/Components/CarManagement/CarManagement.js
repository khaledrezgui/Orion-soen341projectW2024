import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarManagementCard from './CarManagementCard';
import EditCarModal from '../EditCarModal';
import './CarManagement.css';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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
    setEditModalOpen(true);
  };

  const onModalConfirm = async (updatedCarDetails) => {
    try {
      await axios.put(`/cars/${selectedCar._id}`, updatedCarDetails);
      setEditModalOpen(false);
      // Refetch cars to update the list
      const updatedCars = await axios.get('/cars');
      setCars(updatedCars.data);
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  return (
    <div className="car-management">
      <h2>Car Management</h2>
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
          onConfirm={onModalConfirm}
        />
      )}
    </div>
  );
};

export default CarManagement;
