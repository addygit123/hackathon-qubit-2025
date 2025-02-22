import React from "react";
import useTicketStore from "../store/UseTicketStore";

const TicketDetails = () => {
  const ticketDetails = useTicketStore((state) => state.ticketDetails);
  const qrCodeURL = useTicketStore((state) => state.qrCode);

  console.log("Ticket Details from Store:", ticketDetails);
  console.log("🔗 QR Code URL:", qrCodeURL);

  return ticketDetails ? (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        🎟️ Ticket Details
      </h2>

      <div className="space-y-2">
        <p className="text-gray-700">
          <strong className="text-gray-900">🚆 Train:</strong>{" "}
          {ticketDetails.trainName}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">📍 From:</strong>{" "}
          {ticketDetails.from}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">📍 To:</strong> {ticketDetails.to}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">📅 Date:</strong>{" "}
          {ticketDetails.date}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">💺 Seats Booked:</strong>{" "}
          {ticketDetails.seatsBooked}
        </p>
      </div>

      {/* QR Code Display */}
      {qrCodeURL ? (
        <div className="mt-4 flex justify-center">
          <img
            src={qrCodeURL}
            alt="QR Code"
            className="w-32 h-32 rounded-md shadow-md border border-gray-300"
            onLoad={() => console.log("✅ QR Code Loaded Successfully")}
            onError={(e) => {
              console.error("❌ QR Code failed to load:", e.target.src);
              e.target.style.display = "none"; // Hide if error occurs
            }}
          />
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          ⚠️ QR Code Not Available
        </p>
      )}
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-4">🚫 No Tickets Available</p>
  );
};

export default TicketDetails;
