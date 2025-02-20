import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import useTrainStore from "../store/UseStore"; // Update the path to your Zustand store

const AvailableTrains = () => {
  const location = useLocation();
  const { to, from, date, id } = location.state || {}; // Data passed from the Tickets page
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setFormData = useTrainStore((state) => state.setFormData);

  useEffect(() => {
    const fetchTrains = async () => {
      if (!from || !to || !date) return; // Ensure all fields are provided

      setLoading(true);
      const apiUrl = "https://67b73a612bddacfb270e35cf.mockapi.io/trains"; // Your Mock API URL

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch trains");
        const data = await response.json();

        // Filter trains based on user input
        const filteredTrains = data.filter(
          (train) =>
            train.from === from && train.to === to && train.date === date
        );

        setTrains(filteredTrains);
      } catch (error) {
        console.error("Error fetching train data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();

    // Optionally fetch ticket data from Firebase
    const fetchTicket = async () => {
      if (!id) return;
      const docRef = doc(db, "tickets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Ticket Data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchTicket();
  }, [from, to, date, id]);

  const handleBook = (train) => {
    // Update formData in Zustand store
    setFormData({
      from: train.from,
      to: train.to,
      date: train.date,
      mode: "Train", // Add mode here as it's part of formData
    });
    // Navigate to PaymentPage with train data
    navigate("/payment", { state: { train } });
  };

  return (
    <div className="p-6 h-screen justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Available Trains</h1>
      {loading ? (
        <p>Loading trains...</p>
      ) : trains.length > 0 ? (
        <ul className="space-y-4 w-[70vw]">
          {trains.map((train) => (
            <ul
              key={train.id}
              className=" flex border p-4 gap-4 block rounded shadow"
            >
              <h2 className="w-[20vw] text-xl font-bold">{train.trainName}</h2>
              <li>Train Number: {train.trainNumber}</li>
              <li>Date: {train.date}</li>
              <li>From: {train.from}</li>
              <li>To: {train.to}</li>
              <li>Seats Available: {train.seatsAvailable}</li>
              <button
                onClick={() => handleBook(train)}
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Book
              </button>
            </ul>
          ))}
        </ul>
      ) : (
        <p>No trains available for the selected route and date.</p>
      )}
    </div>
  );
};

export default AvailableTrains;
