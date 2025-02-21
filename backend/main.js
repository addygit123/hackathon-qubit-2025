import express from "express";
import cors from "cors";
import { generateQRCode } from "./qr.js";
import { booking, getBookingDetails } from "./firebasemethod.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Booking Route
app.post("/booking", async (req, res) => {
  try {
    const data = req.body;

    // Validate booking data
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Booking data is required" });
    }

    // Call the booking function
    const ticketDetails = await booking(data);
    if (!ticketDetails) {
      return res.status(500).json({ error: "Booking failed" });
    }

    // Generate QR code based on ticket details
    const qrCode = await generateQRCode(ticketDetails.id); // Pass the booking ID or relevant data

    // Send response with ticket details and QR code
    res.json({
      ticketDetails,
      qrCode,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ticket Check Route
app.post("/ticketcheck", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Ticket ID is required" });
    }

    const ticketStatus = await getBookingDetails(id);
    res.json(ticketStatus);
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
