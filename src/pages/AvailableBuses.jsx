import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBusStore from "../store/useBusStore"; // Zustand store

const AvailableBuses = () => {
  const location = useLocation();
  const { to, from, date } = location.state || {}; // Data passed from Tickets page
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setFormData = useBusStore((state) => state.setFormData);

  useEffect(() => {
    const fetchBuses = async () => {
      if (!from || !to || !date) return;

      setLoading(true);
      const apiUrl = "https://67b73a612bddacfb270e35cf.mockapi.io/buses"; // Replace with your mock API URL

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch buses");
        const data = await response.json();

        // Filter buses based on user input
        const filteredBuses = data.filter(
          (bus) => bus.from === from && bus.to === to && bus.date === date
        );

        setBuses(filteredBuses);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [from, to, date]);

  const handleBook = (bus) => {
    setFormData({
      from: bus.from,
      to: bus.to,
      date: bus.date,
      mode: "Bus",
    });

    navigate("/payment-bus", { state: { bus } });
  };

  return (
    <div className="p-6 h-screen justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Available Buses</h1>
      {loading ? (
        <p>Loading buses...</p>
      ) : buses.length > 0 ? (
        <ul className="space-y-4 w-[70vw]">
          {buses.map((bus) => (
            <ul
              key={bus.id}
              className="flex border p-4 gap-4 block rounded shadow"
            >
              <h2 className="w-[20vw] text-xl font-bold">{bus.busName}</h2>
              <li>Bus Number: {bus.busNumber}</li>
              <li>Date: {bus.date}</li>
              <li>From: {bus.from}</li>
              <li>To: {bus.to}</li>
              <li>Seats Available: {bus.seatsAvailable}</li>
              <button
                onClick={() => handleBook(bus)}
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Book
              </button>
            </ul>
          ))}
        </ul>
      ) : (
        <p>No buses available for the selected route and date.</p>
      )}
    </div>
  );
};

export default AvailableBuses;
