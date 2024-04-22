import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Make sure to import jwtDecode correctly
import PaymentModal from './PaymentModal';
import { useNavigate  } from "react-router-dom";

const SharedReservationCard = ({ reservation, car, onCancel }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const token = localStorage.getItem('token'); // Assuming you have a token stored in localStorage

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const navigate = useNavigate();

  if (!car) return null; // Render nothing if car details are not provided

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false
    };
    return new Date(dateString).toLocaleString([], options);
  };

  // Calculate the individual payment amount
  const individualPaymentAmount = reservation.totalPrice / (reservation.sharedUsers.length + 1); // +1 for the original user
  

  const removeSharedUser = async () => {
    if (!token || !reservation || !userId) return;
  
    try {
      // Create a new list of sharedUsers without the current userId
      const updatedSharedUsers = reservation.sharedUsers.filter(sharedUserId => sharedUserId !== userId);
  
      console.log(updatedSharedUsers);
      debugger;
      // Update the reservation on the backend
      const updateResponse = await axios.put(`/reservations/${reservation._id}`, {
        sharedUsers: updatedSharedUsers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (updateResponse.status === 200) {
        console.log('Shared user removed successfully');
        // Optionally refresh the reservation data or handle UI updates here
        // This could be navigating away or removing the reservation from the list
      } else {
        console.error('Failed to remove shared user');
        // Handle the failure case, e.g., showing an error message
      }
    } catch (error) {
      console.error('Error removing shared user:', error);
      // Handle any exceptions, e.g., network issues, server errors, etc.
    }
  };
  
  
  // Handle pay action
  const handlePay = () => {
    setIsPaymentModalOpen(true);
  };

  // Handle cancel action
  const handleCancel = () => {
    onCancel(reservation._id); // Assuming onCancel needs reservation ID
    removeSharedUser();
    window.location.reload()
  };

  const onPaymentConfirm = async (paymentDetails) => {
    if (!token) return;


    try {
      // Update the user's credit card details
      const updateResponse = await axios.put(`/users/${userId}`, {
        creditCard: paymentDetails,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (updateResponse.status === 200) {
        console.log('Credit card details updated successfully');
        navigate(`/sharedreseervationconfirmation/${reservation._id}`); // Redirect to the confirmation page
        removeSharedUser();
        // Handle successful update, e.g., closing the modal, refreshing data
      } else {
        console.error('Failed to update credit card details');
      }
    } catch (error) {
      console.error('Error updating credit card details:', error);
    }
    setIsPaymentModalOpen(false); // Close the modal after confirming
  };

  return (
    <>
      <div className="reservation-card">
        <h3>Reservation for {car.model} ({car.make} {car.year})</h3>
        <p>Pickup Date: {formatDateTime(reservation.startDate)}</p>
        <p>Return Date: {formatDateTime(reservation.endDate)}</p>
        <p>Amount due: ${individualPaymentAmount.toFixed(2)}</p>
        <p>Selected Additional Services:
          {reservation.gps && <span> GPS</span>}
          {reservation.safetySeat && <span>, Child Safety Seat</span>}
          {reservation.fuelService && <span>, Fuel Service</span>}
          {reservation.insurance && <span>, Insurance</span>}
        </p>
        <div>
          <button onClick={handlePay} style={{ backgroundColor: '#4CAF50', color: 'white' }}>Pay</button>
          <button onClick={handleCancel} style={{ backgroundColor: '#f44336', color: 'white', marginLeft: '10px' }}>Cancel</button>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={onPaymentConfirm}
      />
    </>
  );
};

export default SharedReservationCard;
