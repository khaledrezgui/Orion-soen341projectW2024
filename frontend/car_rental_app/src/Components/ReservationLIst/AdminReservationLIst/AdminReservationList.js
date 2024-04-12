import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import ReservationCard from './AdminReservationCard';
import SimpleModal from '../../SimpleModal';
import './AdminReservationList.css';

const AdminReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [cars, setCars] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const fetchReservations = async () => {
            try {
                const res = await axios.get('/reservations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userReservations = res.data;
                setReservations(userReservations);

                const carsData = {};
                for (let reservation of userReservations) {
                    if (!carsData[reservation.car]) {
                        const carRes = await axios.get(`/cars/${reservation.car}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        carsData[reservation.car] = carRes.data;
                    }
                }
                setCars(carsData);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
            }
        };

        fetchReservations();
    }, [token]);

    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`/reservations/${reservationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(reservations.filter(reservation => reservation._id !== reservationId));
        } catch (error) {
            console.error('Failed to delete reservation:', error);
        }
    };

    const handleUpdate = async (reservationId) => {
        const reservationToUpdate = reservations.find(r => r._id === reservationId);
        
        try {
            const carRes = await axios.get(`/cars/${reservationToUpdate.car}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            setCars(prevCars => ({ ...prevCars, [reservationToUpdate.car]: carRes.data }));
            
            setCurrentReservation({ ...reservationToUpdate, car: carRes.data });
            setModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch car details:', error);
        }
    };

    const onModalConfirm = async (newStartDate, newEndDate) => {
        if (!currentReservation) return;

        try {
            const response = await axios.put(`/reservations/${currentReservation._id}`, {
                startDate: newStartDate,
                endDate: newEndDate,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                const updatedReservations = reservations.map(reservation => 
                    reservation._id === currentReservation._id ? response.data : reservation
                );
                setReservations(updatedReservations);
                setModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to update reservation:', error);
        }
    };

    return (
        <div>
            <h2>Reservations</h2>
            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <ReservationCard
                        key={reservation._id}
                        reservation={reservation}
                        car={cars[reservation.car]}
                        onDelete={() => handleDelete(reservation._id)}
                        onUpdate={() => handleUpdate(reservation._id)}
                    />
                ))
            ) : (
                <p>No reservations found</p>
            )}

            <SimpleModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={onModalConfirm}
                car={currentReservation ? currentReservation.car : null}

            />
        </div>
    );
};

export default AdminReservationList;
