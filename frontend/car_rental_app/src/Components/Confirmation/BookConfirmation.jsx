import React, { useState, useEffect } from "react";
import axios from "axios";


const Confirmation = ({ match }) => {
    const reservationId = match.params.reservationId;
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await axios.get(`/reservations/${reservationId}`);
            setReservation(response.data);
        };
        fetchReservation();
    }, [reservationId]);

    if (!reservation) return <p>Loading...</p>;

    return (
        <div>
            <h2>Reservation Confirmation</h2>
            <p>You have reserved {reservation.car.description}.</p>
        </div>
    );
};


export default Confirmation;