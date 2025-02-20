import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  // Cities List
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!to || !from || !date || !mode) {
      alert("Please fill in all fields!");
      return;
    }
    const navigationPath =
      mode === "Bus"
        ? "/available-buses"
        : mode === "Train"
        ? "/available-trains"
        : "/available-flights";

    navigate(navigationPath, { state: { from, to, date, mode } });
    // Navigate to the AvailableTrains page and pass the form data via state
    // navigate("/available-trains", { state: { to, from, date, mode } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-4xl font-bold text-center">Book a Ticket</h1>

          {/* From Input with Datalist */}
          <div>
            <label className="block">From:</label>
            <input
              type="text"
              list="cities-list"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-2 w-full"
              placeholder="Select a city"
            />
            <datalist id="cities-list">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          {/* To Input with Datalist */}
          <div>
            <label className="block">To:</label>
            <input
              type="text"
              list="cities-list"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-2 w-full"
              placeholder="Select a city"
            />
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
              <button
                type="button"
                className={`p-2 border ${
                  mode === "Flight" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setMode("Flight")}
              >
                Flight
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tickets;
