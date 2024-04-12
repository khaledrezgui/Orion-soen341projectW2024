import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ReservationConfirmation = () => {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState(null);
    const [car, setCar] = useState(null);
    const [user, setUser] = useState(null); // Changed from setUsername for consistency

    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if not logged in
            return;
        }

        const decodedToken = jwtDecode(token);
        const loggedInUserId = decodedToken.id; 

        const fetchReservationAndCar = async () => {
            try {
                // Fetching reservation
                const reservationResponse = await axios.get(`/reservations/${reservationId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setReservation(reservationResponse.data);

                // Fetching car details
                const carId = reservationResponse.data.car;
                const carResponse = await axios.get(`/cars/${carId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setCar(carResponse.data);

                // Fetching current logged-in user details instead of reservation user
                const userResponse = await axios.get(`/users/${loggedInUserId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setUser(userResponse.data);
            } catch (error) {
                console.error('Error fetching reservation, car or user details:', error);
            }
        };

        fetchReservationAndCar();
    }, [reservationId, navigate]);

    if (!reservation || !car || !user) return <p>Loading...</p>;

    const formatDateTime = (dateString) => {
        const options = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
        };
        return new Date(dateString).toLocaleString([], options);
    };

    const lastFourDigits = user.creditCard?.number?.slice(-4);

    return (
        <div className="confirmation-container">
            <h2>{user.username}, Reservation Confirmation</h2>
            <p>You have reserved: {car.make} {car.model} ({car.year}).</p>
            <p>Payment charged to card ending in <strong>{lastFourDigits}</strong></p>
            <div className="date-box">
                <p>Reservation Dates: <span className="date-box">{formatDateTime(reservation.startDate)}</span> to <span className="date-box">{formatDateTime(reservation.endDate)}</span></p>
            </div>

            <p>Selected additional services: 
                {reservation.gps && <span> GPS</span>}
                {reservation.safetySeat && <span>, Child Safety Seat</span>}
                {reservation.fuelService && <span>, Fuel Service</span>}
                {reservation.insurance && <span>, Insurance</span>}
            </p>
        </div>
    );
};

export default ReservationConfirmation;
