import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming the onConfirm function expects an object with the card details
    onConfirm({
      name: cardName,
      number: cardNumber,
      cvv,
      expiry: expiryDate,
    });
    onClose(); // Close the modal after confirming
  };

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal">
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name on Card:</label>
            <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
          </div>
          <div>
            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          </div>
          <div>
            <label>CVV:</label>
            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          </div>
          <div>
            <label>Expiry Date:</label>
            <input type="text" value={expiryDate} placeholder="MM/YY" onChange={(e) => setExpiryDate(e.target.value)} required />
          </div>
          <button type="submit">Confirm Payment</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
