import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Confirmation = () => {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState(null);
    const [car, setCar] = useState(null);
    const [user, setUsername] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            // If not logged in, redirect to login page
            navigate('/login');
        }

        const fetchReservationAndCar = async () => {
            try {
                const reservationResponse = await axios.get(`/reservations/${reservationId}`);
                setReservation(reservationResponse.data);
                const carId = reservationResponse.data.car;
                const userId = reservationResponse.data.user;

                const carResponse = await axios.get(`/cars/${carId}`);
                const userResponse = await axios.get(`/users/${userId}`);

                setCar(carResponse.data);
                setUsername(userResponse.data);

            } catch (error) {
                console.error('Error fetching reservation, car or user details:', error);
            }
        };

        fetchReservationAndCar();
    }, [reservationId]);

    if (!reservation || !car) return <p>Loading...</p>;

    return (
        <div>
            <h2>{user.username}, Reservation Confirmation</h2>
            <p>You have reserved {car.make} {car.model}.</p>
            <p>Reservation Dates: {new Date(reservation.startDate).toLocaleDateString()} to {new Date(reservation.endDate).toLocaleDateString()}</p>
        </div>
    );
};

export default Confirmation;
