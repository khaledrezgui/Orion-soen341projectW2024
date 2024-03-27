import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './Confirmation.css'; 

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

    const formatDateTime = (dateString) => {
        const options = {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: false
        };
        return new Date(dateString).toLocaleString([], options);
    };

    return (
        <div className="confirmation-container">
            <h2>{user.username}, Reservation Confirmation</h2>
            <p>You have reserved: {car.make} {car.model} ({car.year}).</p>
            <div className="date-box">
                <p>Reservation Dates: <span className="date-box">{formatDateTime(reservation.startDate)}</span> to  <span className="date-box">{formatDateTime(reservation.endDate)}</span></p>
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

export default Confirmation;
