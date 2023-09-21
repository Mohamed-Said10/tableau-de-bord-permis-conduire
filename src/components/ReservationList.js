import React, { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [editedReservation, setEditedReservation] = useState({});
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data));
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to delete the reservation with the specified ID
    fetch(`http://localhost:3001/reservations/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion was successful, update the UI by filtering out the deleted reservation
          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== id)
          );
          console.log(`Deleted reservation with ID ${id}`);
        } else {
          console.error(`Failed to delete reservation with ID ${id}`);
          // Handle the error, e.g., show an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
        // Handle network or other errors
      });
  };

  const handleModify = (id) => {
    // Start editing the reservation with the specified ID
    setEditingReservationId(id);
    // Set the initial edited reservation to the current reservation
    const reservationToEdit = reservations.find(
      (reservation) => reservation.id === id
    );
    setEditedReservation(reservationToEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the edited reservation with the changed values
    setEditedReservation({
      ...editedReservation,
      [name]: value,
    });
  };

  const handleSave = (id) => {
    // Make a PUT request to update the reservation with the specified ID
    fetch(`http://localhost:3001/reservations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedReservation),
    })
      .then((response) => {
        if (response.ok) {
          // If the update was successful, update the UI with the edited reservation
          setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation.id === id ? editedReservation : reservation
            )
          );
          setEditingReservationId(null); // Stop editing
          console.log(`Updated reservation with ID ${id}`);
        } else {
          console.error(`Failed to update reservation with ID ${id}`);
          // Handle the error, e.g., show an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error updating reservation:", error);
        // Handle network or other errors
      });
  };

  const handleCancel = () => {
    // Cancel the editing mode
    setEditingReservationId(null);
  };

  const handlePay = (id) => {
    setSelectedReservationId(id);
  };

  return (
    <>
      <h2>Liste des Réservations</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date d'Examen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>
                {editingReservationId === reservation.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedReservation.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  reservation.firstName
                )}
              </td>
              <td>
                {editingReservationId === reservation.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedReservation.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  reservation.lastName
                )}
              </td>
              <td>
                {editingReservationId === reservation.id ? (
                  <input
                    type="datetime-local"
                    name="dateExamen"
                    value={editedReservation.dateExamen}
                    onChange={handleChange}
                  />
                ) : (
                  reservation.dateExamen
                )}
              </td>
              <td>
                {editingReservationId === reservation.id ? (
                  <>
                    <button onClick={() => handleSave(reservation.id)}>
                      Enregistrer
                    </button>
                    <button onClick={handleCancel}>Annuler</button>
                  </>
                ) : (
                  <button onClick={() => handleModify(reservation.id)}>
                    Modifier
                  </button>
                )}
                <button onClick={() => handleDelete(reservation.id)}>
                  Supprimer
                </button>
                <button onClick={() => handlePay(reservation.id)}>Payer</button>
                {selectedReservationId === reservation.id && (
                  <PaymentForm
                  onClose={() => setSelectedReservationId(null)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReservationList;

