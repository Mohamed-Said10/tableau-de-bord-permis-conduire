import React, { useState, useEffect } from 'react';

const InscriptionForm = () => {
  const [inscription, setInscription] = useState({
    firstName: '',
    lastName: '',
    dateExamen: '',
  });

  const [disabledDates, setDisabledDates] = useState([]);
  const [reservedHours, setReservedHours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/reservations')
      .then((response) => response.json())
      .then((data) => {
        // Extract dates and hours from the data
        const dates = data.map((reservation) => reservation.dateExamen?.split('T')[0]).filter(Boolean);
        const hours = data.map((reservation) => {
          const timePart = reservation.dateExamen?.split('T')[1];
          return timePart ? timePart.slice(0, 5) : null;
        }).filter(Boolean);
        setDisabledDates(dates);
        setReservedHours(hours);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e) => {
    setInscription({
      ...inscription,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(inscription), // Convert the state to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log("Server response:", data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error:", error);
      });
    console.log('Form data submitted:', inscription);
  };

  

  return (
    <>
      <h2>Formulaire d'Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={inscription.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="lastName"
            value={inscription.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de l'Examen :</label>
          <input
            type="datetime-local"
            name="dateExamen"
            value={inscription.dateExamen}
            onChange={handleChange}
            required
            min={new Date().toISOString().slice(0, 16)}
            max={'9999-12-31T23:59'}
            disabled={
              disabledDates.includes(inscription.dateExamen?.split('T')[0]) ||
              reservedHours.includes(inscription.dateExamen?.split('T')[1]?.slice(0, 5))
            }
          />
        </div>
        <button type="submit">S'Inscrire</button>
      </form>
    </>
  );
};

export default InscriptionForm;
