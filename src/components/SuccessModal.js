import React from 'react';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Payment Successful</h2>
        <p>Your payment has been successfully processed.</p>
      </div>
    </div>
  );
};

export default SuccessModal;
