import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import ReservationCard from './ReservationCard';
import SimpleModal from '../SimpleModal';

const ReservationList = () => {
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
                const userReservations = res.data.filter(r => r.user === userId);
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

    const handleUpdate = (reservationId) => {
        const reservationToUpdate = reservations.find(r => r._id === reservationId);
        setCurrentReservation(reservationToUpdate);
        setModalOpen(true);
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
            <h2>Your Reservations</h2>
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
                minDate={currentReservation && cars[currentReservation.car] ? cars[currentReservation.car].availability.start : ''}
                maxDate={currentReservation && cars[currentReservation.car] ? cars[currentReservation.car].availability.end : ''}
            />
        </div>
    );
};

export default ReservationList;
