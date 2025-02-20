import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import AvailableTrains from "./AvailableTrains"; // Import the AvailableTrains component

const Tickets = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");
  const [showTrains, setShowTrains] = useState(false); // State to toggle train display

  // City list
  const cities = [
    "Jabalpur",
    "Katni",
    "Sagar",
    "Satna",
    "Rewa",
    "Damoh",
    "Chhindwara",
    "Seoni",
    "Mandla",
    "Narsinghpur",
    "Umaria",
    "Shahdol",
    "Panna",
    "Maihar",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Bhopal",
    "Indore",
    "Patna",
    "Chandigarh",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!to || !from || !date || !mode) {
      alert("Please fill in all fields!");
      return;
    }
    console.log("Submitting the following data:", { to, from, date, mode });

    try {
      // Add ticket data to Firestore
      await addDoc(collection(db, "tickets"), {
        to,
        from,
        date,
        mode,
        createdAt: new Date(),
      });

      alert(`Ticket from ${from} to ${to} by ${mode} submitted successfully!`);
      setShowTrains(true); // Show AvailableTrains component after successful submission
    } catch (error) {
      console.error("Error adding ticket: ", error);
      alert("Failed to submit the ticket.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-4xl font-bold text-center">Book a Ticket</h1>

          {/* From Dropdown */}
          <div>
            <label className="block">From:</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* To Dropdown */}
          <div>
            <label className="block">To:</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label className="block">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Mode Selection Buttons */}
          <div>
            <label className="block">Mode:</label>
            <div className="space-x-4">
              <button
                type="button"
                className={`p-2 border ${
                  mode === "Bus" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setMode("Bus")}
              >
                Bus
              </button>
              <button
                type="button"
                className={`p-2 border ${
                  mode === "Train" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setMode("Train")}
              >
                Train
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>

        {/* Render AvailableTrains Component */}
        {showTrains && <AvailableTrains from={from} to={to} date={date} />}
      </div>
    </div>
  );
};

export default Tickets;
