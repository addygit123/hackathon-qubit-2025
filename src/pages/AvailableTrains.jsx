import React, { useState, useEffect } from "react";

const AvailableTrains = ({ from, to, date }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrains = async () => {
      if (!from || !to || !date) return;

      setLoading(true);
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const apiUrl = `https://trainapi.example.com/trains?from=${from}&to=${to}&date=${formattedDate}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch trains");
        const data = await response.json();
        setTrains(data.trains);
      } catch (error) {
        console.error("Error fetching train data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [from, to, date]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Available Trains</h2>
      {loading ? (
        <p>Loading trains...</p>
      ) : trains.length > 0 ? (
        <ul className="mt-4">
          {trains.map((train) => (
            <li key={train.id} className="mb-4">
              <button
                onClick={() => alert(`Clicked train: ${train.name}`)}
                className="text-blue-500 underline"
              >
                {train.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trains available for the selected duration.</p>
      )}
    </div>
  );
};

export default AvailableTrains;
