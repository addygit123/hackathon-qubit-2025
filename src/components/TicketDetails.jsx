import React, { useRef } from "react";
import useTicketStore from "../store/UseTicketStore";
import jsPDF from "jspdf";

const TicketDetails = () => {
  const ticketDetails = useTicketStore((state) => state.ticketDetails);
  const qrCodeURL = useTicketStore((state) => state.qrCode);
  const ticketRef = useRef(null); // Reference to the ticket for PDF

  console.log("Ticket Details from Store:", ticketDetails);
  console.log("🔗 QR Code URL:", qrCodeURL);

  const downloadTicketPDF = async () => {
    if (!ticketDetails) {
      console.error("❌ No ticket details available");
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297],
      });

      // Add decorative header with background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(0, 0, 210, 25, "F");

      // Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(44, 62, 80);
      pdf.text("Train Ticket", 105, 15, { align: "center" });

      // Main content setup
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      const startY = 55;
      const leftMargin = 20;
      const lineHeight = 10;

      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, 45, 190, 45);

      // Basic ticket details (excluding passengers)
      const basicDetails = [
        { label: "Train", value: String(ticketDetails.trainName || "") },
        { label: "From", value: String(ticketDetails.from || "") },
        { label: "To", value: String(ticketDetails.to || "") },
        { label: "Date", value: String(ticketDetails.date || "") },
        { label: "Seats", value: String(ticketDetails.seatsBooked || "") },
      ];

      // Draw basic ticket information
      basicDetails.forEach((detail, index) => {
        const yPosition = startY + lineHeight * index;
        pdf.setFont("helvetica", "bold");
        pdf.text(detail.label + ":", leftMargin, yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.text(detail.value, leftMargin + 40, yPosition);
      });

      // Add passenger section header
      const passengerStartY = startY + basicDetails.length * lineHeight + 15;
      pdf.setFont("helvetica", "bold");
      pdf.text("Passenger Details:", leftMargin, passengerStartY);

      // Draw passenger information
      if (ticketDetails.passengers && ticketDetails.passengers.length > 0) {
        pdf.setFont("helvetica", "normal");
        ticketDetails.passengers.forEach((passenger, index) => {
          const passengerY = passengerStartY + 10 + index * 8;
          pdf.text(
            `${index + 1}. ${passenger.name} (Age: ${passenger.age})`,
            leftMargin + 5,
            passengerY
          );
        });
      } else {
        pdf.setFont("helvetica", "normal");
        pdf.text("No Passengers", leftMargin + 5, passengerStartY + 10);
      }

      // Calculate QR code position based on passengers
      const qrStartY =
        passengerStartY +
        (ticketDetails.passengers
          ? ticketDetails.passengers.length * 8 + 20
          : 30);

      // Handle QR Code
      if (qrCodeURL) {
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = qrCodeURL;

            img.onload = () => {
              const qrX = (210 - 70) / 2;
              pdf.addImage(img, "PNG", qrX, qrStartY, 70, 70);
              resolve();
            };

            img.onerror = () => {
              reject(new Error("QR Code loading failed"));
            };
          });
        } catch (error) {
          console.error("❌ QR Code Error:", error);
          pdf.setTextColor(255, 0, 0);
          pdf.text("⚠️ QR Code Not Available", 105, qrStartY + 35, {
            align: "center",
          });
        }
      } else {
        pdf.setTextColor(255, 0, 0);
        pdf.text("⚠️ QR Code Not Available", 105, qrStartY + 35, {
          align: "center",
        });
      }

      // Add border around all content
      const totalContentHeight = qrStartY + 80 - 35; // Calculate total content height
      pdf.setDrawColor(100, 100, 100);
      pdf.rect(15, 35, 180, totalContentHeight);

      // Footer
      const footerY = qrStartY + 90;
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        "This ticket is non-transferable and must be presented upon request.",
        105,
        footerY,
        { align: "center" }
      );
      pdf.text(`Booking Reference: ${String(Date.now())}`, 105, footerY + 5, {
        align: "center",
      });

      // Save with safe filename
      const safeTrainName = String(ticketDetails.trainName || "Train").replace(
        /[^a-z0-9]/gi,
        "_"
      );
      pdf.save(`Ticket_${safeTrainName}_${Date.now()}.pdf`);
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("Failed to generate ticket PDF. Please try again.");
    }
  };
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
      <div className="flex justify-center mt-4">
        <button
          onClick={downloadTicketPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          📥 Download Ticket
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-4">🚫 No Tickets Available</p>
  );
};

export default TicketDetails;
