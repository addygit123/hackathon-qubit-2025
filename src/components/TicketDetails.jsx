import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import jsPDF from "jspdf";

const TicketDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketDetails, qrCode } = location.state || {};
  const [qrCodeURL, setQrCodeURL] = useState(null);

  useEffect(() => {
    // Redirect if no ticket details
    if (!ticketDetails) {
      navigate("/", { replace: true });
    }

    // Handle QR Code URL
    if (qrCode instanceof Blob) {
      const url = URL.createObjectURL(qrCode);
      setQrCodeURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setQrCodeURL(qrCode);
    }
  }, [qrCode, ticketDetails, navigate]);

  // Fallback Values
  const ticketId = ticketDetails?.id || "N/A";
  const trainName = ticketDetails?.trainName || "Not available";
  const from = ticketDetails?.from || "Not available";
  const to = ticketDetails?.to || "Not available";
  const formattedDate = ticketDetails?.date
    ? format(new Date(ticketDetails.date), "dd/MM/yyyy")
    : "N/A";
  const status = ticketDetails?.status || "Not available";

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Your Ticket Details", 10, 10);
    doc.text(`Ticket ID: ${ticketId}`, 10, 20);
    doc.text(`Train: ${trainName}`, 10, 30);
    doc.text(`From: ${from}`, 10, 40);
    doc.text(`To: ${to}`, 10, 50);
    doc.text(`Date: ${formattedDate}`, 10, 60);
    doc.text(`Status: ${status}`, 10, 70);
    doc.save("ticket.pdf");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Ticket</h1>

        <div className="mb-6 flex justify-center">
          {qrCodeURL ? (
            <img
              src={qrCodeURL}
              alt={`QR Code for ticket ID: ${ticketId}`}
              className="max-w-xs max-h-48 object-contain"
            />
          ) : (
            <p className="text-gray-500">QR Code not available</p>
          )}
        </div>

        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Ticket Details</h2>
          <p>
            <strong>Ticket ID:</strong> {ticketId}
          </p>
          <p>
            <strong>Train:</strong> {trainName}
          </p>
          <p>
            <strong>From:</strong> {from}
          </p>
          <p>
            <strong>To:</strong> {to}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white w-full py-2 rounded font-semibold hover:bg-blue-600"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketDetails;
