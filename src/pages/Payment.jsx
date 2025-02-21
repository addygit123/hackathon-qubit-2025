import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTrainStore from "../store/UseStore";
import { useTicketStore } from "../store/UseTicketStore";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore methods
// import { getAuth } from "firebase/auth"; // Optional if you want to use authenticated users

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train } = location.state || {};
  const { formData } = useTrainStore();
  const { setTicketDetails, setQRCode } = useTicketStore();

  const [loading, setLoading] = useState(false);
  const db = getFirestore(); // Initialize Firestore
  // const auth = getAuth(); // Initialize Auth if needed

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Prepare ticket data
      const ticketData = {
        trainName: train?.trainName || "Unknown Train",
        trainNumber: train?.trainNumber || "Unknown Number",
        from: formData?.from || "Unknown Station",
        to: formData?.to || "Unknown Station",
        date: formData?.date || "Unknown Date",
        userName: "John Doe", // Replace with user input or auth data
        userEmail: "johndoe@example.com", // Replace with user input or auth data
        seatsBooked: 1,
        paymentStatus: "Paid",
        timestamp: new Date().toISOString(),
      };

      // Save to Firestore
      // const userId = auth.currentUser?.uid || "guest_user"; // Use Auth UID or fallback
      const userId = "addy";
      const ticketDocRef = doc(
        db,
        `users/${userId}/tickets/${new Date().getTime()}`
      ); // Unique ticket ID

      await setDoc(ticketDocRef, ticketData);

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
            <strong>From:</strong> {formData.from}
          </p>
          <p className="mb-2">
            <strong>To:</strong> {formData.to}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {formData.date}
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <p className="mb-2">
            <strong>Total Amount:</strong> ₹500
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
