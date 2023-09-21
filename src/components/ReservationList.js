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
      <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Liste des Réservations</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-center align-middle">First Name</th>
            <th className="border border-gray-300 p-2 text-center align-middle">Last Name</th>
            <th className="border border-gray-300 p-2 text-center align-middle">Date d'Examen</th>
            <th className="border border-gray-300 p-2 text-center align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="border border-gray-300 p-2 text-center align-middle">
                {editingReservationId === reservation.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedReservation.firstName}
                    onChange={handleChange}
                    className="w-full rounded p-2 border border-gray-300"
                  />
                ) : (
                  reservation.firstName
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center align-middle">
                {editingReservationId === reservation.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedReservation.lastName}
                    onChange={handleChange}
                    className="w-full rounded p-2 border border-gray-300"
                  />
                ) : (
                  reservation.lastName
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center align-middle">
                {editingReservationId === reservation.id ? (
                  <input
                    type="datetime-local"
                    name="dateExamen"
                    value={editedReservation.dateExamen}
                    onChange={handleChange}
                    className="w-full rounded p-2 border border-gray-300"
                  />
                ) : (
                  reservation.dateExamen
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center align-middle">
                {editingReservationId === reservation.id ? (
                  <>
                    <button
                      onClick={() => handleSave(reservation.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleModify(reservation.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => handlePay(reservation.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Payer
                    </button>
                    {selectedReservationId === reservation.id && (
                      <div className="modal-overlay">
                        <PaymentForm
                          onClose={() => setSelectedReservationId(null)}
                        />
                      </div>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ReservationList;

