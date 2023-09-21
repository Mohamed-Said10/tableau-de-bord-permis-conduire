import React, { useState } from 'react';
import SuccessModal from './SuccessModal';
import SuccessBanner from './SuccessBanner';

const PaymentForm = ({ onClose }) => {

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo({
      ...creditCardInfo,
      [name]: value,
    });
  };

  const isCreditCardValid = () => {
    // Basic validation checks for credit card inputs
    if (!creditCardInfo.cardNumber || creditCardInfo.cardNumber.length !== 16) {
      return false;
    }
    if (!creditCardInfo.cardHolderName) {
      return false;
    }
    if (!creditCardInfo.expiryDate || !/^\d{2}\/\d{2}$/.test(creditCardInfo.expiryDate)) {
      return false;
    }
    if (!creditCardInfo.cvv || creditCardInfo.cvv.length !== 3) {
      return false;
    }
    return true;
  };
  

  const handlePayment = () => {
    if (!isCreditCardValid()) {
      alert('Please check your credit card information.');
      return;
    }
    setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose()
      }, 2000);
  };

  return (
    <div id="payment-modal" className="modal">
    {paymentSuccess && <SuccessBanner message="Payment successful!" />}
      <div className="modal-content bg-gray-200 w-96 p-6 rounded-lg shadow-lg flex flex-col">
        <span className="close self-end text-gray-600 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4 text-center">Payment Form</h2>
        <form className="text-center">
          <div className="form-group mb-4">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={creditCardInfo.cardNumber}
              onChange={handleInputChange}
              className="w-full p-2 border bg-gray-100 border-gray-300 rounded"
              placeholder='Please enter 16-digit number'
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="cardHolderName">Cardholder Name:</label>
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={creditCardInfo.cardHolderName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
              placeholder='The cardholder name should not be empty'
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={creditCardInfo.expiryDate}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              placeholder='Date format is "MM/YY" (e.g., "12/25")'
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={creditCardInfo.cvv}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              placeholder='The CVV should be a 3-digit number'
            />
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Pay $50
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
