import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import ShareReservationCard from './ShareReservationCard';
import PaymentModal from './PaymentModal'; // Import the PaymentModal component

const SharedReservationList = () => {
    const [sharedReservations, setSharedReservations] = useState([]);
    const [cars, setCars] = useState({});
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null); // Track the selected reservation for payment
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const handlePay = (reservation) => {
            setSelectedReservation(reservation);
            setIsPaymentModalOpen(true);
          };

        const fetchSharedReservations = async () => {
            if (!token) return;
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
        
            try {
                // Fetch all reservations
                const res = await axios.get('/reservations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
        
                // Filter for reservations where the logged-in user is in the sharedUsers list
                const userSharedReservations = res.data.filter(reservation => reservation.sharedUsers.includes(userId));
        
                // Map to store car details to minimize API calls
                const carsData = {};
        
                // Fetch car details for each shared reservation
                for (let reservation of userSharedReservations) {
                    if (!carsData[reservation.car]) {
                        const carRes = await axios.get(`/cars/${reservation.car}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        carsData[reservation.car] = carRes.data;
                    }
                }
        
                // Update state with filtered shared reservations and car details
                setSharedReservations(userSharedReservations);
                setCars(carsData);
        
            } catch (error) {
                console.error('Failed to fetch shared reservations:', error);
            }
        };
        
        

        fetchSharedReservations();
    }, [token]);

    const handlePay = (reservation) => {
        setSelectedReservation(reservation);
        setIsPaymentModalOpen(true);
    };

    const handleCancel = async (reservationId) => {
        // Implement cancellation logic here
    };

    const onPaymentConfirm = (paymentDetails) => {
        // Implement payment confirmation logic here
        setIsPaymentModalOpen(false);
    };

    return (
        <div>
            <h2>Shared Reservations</h2>
            {sharedReservations.length > 0 ? (
                sharedReservations.map((reservation) => (
                <ShareReservationCard
                key={reservation._id}
                reservation={reservation}
                car={cars[reservation.car]}
                onPay={() => handlePay(reservation)}
                onCancel={() => handleCancel(reservation._id)}
                />
                ))
            ) : (
                <p>No shared reservations found</p>
            )}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onConfirm={onPaymentConfirm}
            />
        </div>
    );
};

export default SharedReservationList;
