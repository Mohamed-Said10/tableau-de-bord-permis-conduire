import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

const PaymentForm = ({ onClose, onPaymentSuccess }) => {
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo({
      ...creditCardInfo,
      [name]: value,
    });
  };

  const handlePayment = () => {
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <div id="payment-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Payment Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={creditCardInfo.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardHolderName">Cardholder Name:</label>
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={creditCardInfo.cardHolderName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={creditCardInfo.expiryDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={creditCardInfo.cvv}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handlePayment}>Pay $50</button>
        </form>
      </div>
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default PaymentForm;
