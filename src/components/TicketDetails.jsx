import React from "react";
import jsPDF from "jspdf";

const TicketDetails = () => {
  const ticketDetails = {
    id: "123456",
    trainName: "Superfast Express",
    from: "Jabalpur",
    to: "Hyderabad",
    date: "21/02/2025",
    status: "Confirmed",
  };

  const qrCodeURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TicketID:123456";

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Your Ticket Details", 10, 10);
    doc.text(`Ticket ID: ${ticketDetails.id}`, 10, 20);
    doc.text(`Train: ${ticketDetails.trainName}`, 10, 30);
    doc.text(`From: ${ticketDetails.from}`, 10, 40);
    doc.text(`To: ${ticketDetails.to}`, 10, 50);
    doc.text(`Date: ${ticketDetails.date}`, 10, 60);
    doc.text(`Status: ${ticketDetails.status}`, 10, 70);

    if (qrCodeURL) {
      doc.addImage(qrCodeURL, "PNG", 10, 80, 50, 50);
    }

    doc.save("ticket.pdf");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Ticket</h1>

        <div className="mb-6 flex justify-center">
          <img
            src={qrCodeURL}
            alt={`QR Code for ticket ID: ${ticketDetails.id}`}
            className="max-w-xs max-h-48 object-contain"
          />
        </div>

        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Ticket Details</h2>
          <p>
            <strong>Ticket ID:</strong> {ticketDetails.id}
          </p>
          <p>
            <strong>Train:</strong> {ticketDetails.trainName}
          </p>
          <p>
            <strong>From:</strong> {ticketDetails.from}
          </p>
          <p>
            <strong>To:</strong> {ticketDetails.to}
          </p>
          <p>
            <strong>Date:</strong> {ticketDetails.date}
          </p>
          <p>
            <strong>Status:</strong> {ticketDetails.status}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="bg-green-500 text-white w-full py-2 rounded font-semibold hover:bg-green-600"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketDetails;
