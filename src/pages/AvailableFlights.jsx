import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFlightStore from "../store/UseFlightStore"; // Use the same Zustand store as buses for form data

const AvailableFlights = () => {
  const location = useLocation();
  const { to, from, date } = location.state || {}; // Data passed from Tickets page
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setFormData = useFlightStore((state) => state.setFormData); // Reusing the store for simplicity

  useEffect(() => {
    const fetchFlights = async () => {
      if (!from || !to || !date) return;

      setLoading(true);
      const apiUrl = "http://localhost:3001/flights"; // Replace with your mock API URL

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch flights");
        const data = await response.json();

        // Filter flights based on user input
        const filteredFlights = data.filter(
          (flight) =>
            flight.from === from && flight.to === to && flight.date === date
        );

        setFlights(filteredFlights);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, date]);

  const handleBook = (flight) => {
    setFormData({
      from: flight.from,
      to: flight.to,
      date: flight.date,
      mode: "Flight", // Add mode as Flight
    });

    navigate("/payment-flight", { state: { flight } });
  };

  return (
    <div className="p-6 h-screen justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>
      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        <ul className="space-y-4 w-[70vw]">
          {flights.map((flight) => (
            <ul
              key={flight.id}
              className="flex border p-4 gap-4 block rounded shadow"
            >
              <h2 className="w-[20vw] text-xl font-bold">
                {flight.flightName}
              </h2>
              <li>Flight Number: {flight.flightNumber}</li>
              <li>Date: {flight.date}</li>
              <li>From: {flight.from}</li>
              <li>To: {flight.to}</li>
              <li>Seats Available: {flight.seatsAvailable}</li>
              <li>Departure Time: {flight.departureTime}</li>
              <li>Arrival Time: {flight.arrivalTime}</li>
              <button
                onClick={() => handleBook(flight)}
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Book
              </button>
            </ul>
          ))}
        </ul>
      ) : (
        <p>No flights available for the selected route and date.</p>
      )}
    </div>
  );
};

export default AvailableFlights;
