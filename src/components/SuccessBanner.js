import React from 'react';

const SuccessBanner = ({ message }) => {
  return (
    <div className="bg-green-500 text-white p-2 text-center rounded-lg shadow-lg">
      {message}
    </div>
  );
};

export default SuccessBanner;
