import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTrainStore from "../store/UseStore";
import { useTicketStore } from "../store/UseTicketStore";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { getAuth } from "firebase/auth"; // Optional if you want to use authenticated users
import { FaPlus, FaTrash } from "react-icons/fa";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train } = location.state || {};
  const { formData } = useTrainStore();
  const { setTicketDetails, setQRCode } = useTicketStore();

  const [loading, setLoading] = useState(false);

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
  const db = getFirestore(); // Initialize Firestore
  const auth = getAuth(); // Initialize Auth if needed
  const user = auth.currentUser;

  // Function to handle input change
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  // Function to add a new passenger
  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "" }]);
  };

  // Function to remove a passenger
  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(updatedPassengers);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (loading) {
        console.log("loading...");
      }

      // Prepare ticket data
      const ticketData = {
        trainName: train?.trainName || "Unknown Train",
        trainNumber: train?.trainNumber || "Unknown Number",
        from: train?.from || "Unknown Station",
        to: train?.to || "Unknown Station",
        date: train?.date || "Unknown Date",
        passengers,
        // userName: user?.displayName, // Replace with user input or auth data
        // userEmail: user?.email, // Replace with user input or auth data
        seatsBooked: passengers.length,
        paymentStatus: "Paid",
        timestamp: new Date().toISOString(),
      };
      console.log(ticketData);

      // Save to Firestore
      // const userId = auth.currentUser?.uid || "guest_user"; // Use Auth UID or fallback
      // const userId = "addy";
      // const ticketDocRef = doc(
      //   db,
      //   `users/${userId}/tickets/${new Date().getTime()}`
      // ); // Unique ticket ID

      // await setDoc(ticketDocRef, ticketData);

      // Mock response for QR code (replace with actual API if needed)
      const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        JSON.stringify(ticketData)
      )}&size=150x150`;

      // Update Zustand store
      setTicketDetails(ticketData);
      setQRCode(qrCodeURL);

      // Navigate to ticket details page
      navigate("/ticket-details", { state: { ticketData, qrCodeURL } });
    } catch (error) {
      console.error("Payment Error:", error);
      alert(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!train || !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Invalid booking data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>

        {/* Train Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Train Details</h2>
          <p className="mb-2">
            <strong>Train Name:</strong> {train.trainName}
          </p>
          <p className="mb-2">
            <strong>Train Number:</strong> {train.trainNumber}
          </p>
          <p className="mb-2">
            <strong>From:</strong> {train.from}
          </p>
          <p className="mb-2">
            <strong>To:</strong> {train.to}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {train.date}
          </p>
        </div>

        {/* Passenger Details Form */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Passenger Details</h2>

          {passengers.map((passenger, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
              <input
                type="text"
                placeholder="Full Name"
                value={passenger.name}
                onChange={(e) =>
                  handlePassengerChange(index, "name", e.target.value)
                }
                className="w-full p-2 mb-2 border rounded"
              />
              {/* <input
                type="email"
                placeholder="Email"
                value={passenger.email}
                onChange={(e) =>
                  handlePassengerChange(index, "email", e.target.value)
                }
                className="w-full p-2 mb-2 border rounded"
              /> */}
              <input
                type="number"
                placeholder="Age"
                value={passenger.age}
                onChange={(e) =>
                  handlePassengerChange(index, "age", e.target.value)
                }
                className="w-full p-2 mb-2 border rounded"
              />
              {passengers.length > 1 && (
                <button
                  onClick={() => removePassenger(index)}
                  className="text-red-600 text-sm flex items-center"
                >
                  <FaTrash className="mr-2" /> Remove Passenger
                </button>
              )}
            </div>
          ))}

          {/* Add Passenger Button */}
          <button
            onClick={addPassenger}
            className="flex items-center justify-center w-full text-indigo-600 font-semibold py-2 border rounded mt-3 hover:bg-indigo-100"
          >
            <FaPlus className="mr-2" /> Add Passenger
          </button>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <p className="mb-2">
            <strong>Total Amount:</strong> ₹{500 * passengers.length}
          </p>
          <p className="mb-2">
            <strong>Payment Mode:</strong> UPI, Debit Card, Credit Card
          </p>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
