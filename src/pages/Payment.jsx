import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTrainStore from "../store/UseStore";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train } = location.state || {};
  const { formData } = useTrainStore();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Prepare ticket data
      const ticketData = {
        trainName: train.trainName,
        trainNumber: train.trainNumber,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        userName: "John Doe", // Replace with dynamic user data
        userEmail: "johndoe@example.com", // Replace with dynamic user data
        seatsBooked: 1, // Example: number of seats booked
      };

      // Send request to booking API
      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment failed");
      }

      const result = await response.json();
      const { ticketDetails, qrCode } = result;
      const qrCodeURL = qrCode.startsWith("data:image/png;base64,")
        ? qrCode
        : `http://localhost:5000/${qrCode}`;
      // Store ticket details and QR code URL in local storage
      localStorage.setItem(
        "lastTicket",
        JSON.stringify({
          ticketDetails,
          qrCode: qrCodeURL, // Store the QR code (Base64 or URL)
        })
      );

      // Navigate to ticket details page
      navigate("/ticket-details", {
        state: {
          ticketDetails,
          qrCode: qrCodeURL, // Pass the QR code URL/base64 to the details page
        },
      });
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
