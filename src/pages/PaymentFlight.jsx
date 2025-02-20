import React from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../backend/firebase"; // Firebase setup
import useFlightStore from "../store/UseFlightStore"; // Zustand store

const PaymentPageFlight = () => {
  const location = useLocation();
  const { flight } = location.state || {}; // Flight data passed from AvailableFlights
  const { formData } = useFlightStore(); // Access form data from Zustand store
  const userId = "user123"; // Replace this with the authenticated user's ID

  const handlePayment = async () => {
    try {
      const ticketData = {
        flightName: flight.flightName,
        flightNumber: flight.flightNumber,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        userName: "John Doe", // Replace with dynamic user data
        userEmail: "johndoe@example.com", // Replace with dynamic user data
        seatsBooked: 1, // Example: number of seats booked
        createdAt: new Date(),
      };

      // Add ticket to the user's Firebase section
      await addDoc(
        collection(db, `users/${userId}/flight-tickets`),
        ticketData
      );

      alert("Payment successful! Ticket created.");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>

        {/* Flight Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Flight Details</h2>
          <p>
            <strong>Flight Name:</strong> {flight.flightName}
          </p>
          <p>
            <strong>Flight Number:</strong> {flight.flightNumber}
          </p>
          <p>
            <strong>From:</strong> {formData.from}
          </p>
          <p>
            <strong>To:</strong> {formData.to}
          </p>
          <p>
            <strong>Date:</strong> {formData.date}
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <p>
            <strong>Total Amount:</strong> ₹2000 {/* Example amount */}
          </p>
          <p>
            <strong>Payment Mode:</strong> UPI, Debit Card, Credit Card
          </p>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white w-full py-2 rounded font-semibold hover:bg-green-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPageFlight;
