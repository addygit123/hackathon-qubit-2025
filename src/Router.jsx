import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Tickets from "./pages/Tickets";
import Scanner from "./pages/Scanner";
import Dashboard from "./pages/Dashboard";
import AvailableTrains from "./pages/AvailableTrains";
import PaymentPage from "./pages/Payment";
import AvailableBuses from "./pages/AvailableBuses";
import PaymentPageBus from "./pages/PaymentBuses";
import PaymentPageFlight from "./pages/PaymentFlight";
import AvailableFlights from "./pages/AvailableFlights";
import SignUp from "./pages/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); 
  }, [auth]);

  return user ? element : <Navigate to="/signup" replace />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Booking" element={<Booking />} />
      <Route path="/tickets" element={<ProtectedRoute element={<Tickets />} />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/available-trains" element={<ProtectedRoute element={<AvailableTrains />} />} />
      <Route path="/available-buses" element={<ProtectedRoute element={<AvailableBuses />} />} />
      <Route path="/available-flights" element={<ProtectedRoute element={<AvailableFlights />} />} />
      <Route path="/payment" element={<ProtectedRoute element={<PaymentPage />} />} />
      <Route path="/payment-bus" element={<ProtectedRoute element={<PaymentPageBus />} />} />
      <Route path="/payment-flight" element={<ProtectedRoute element={<PaymentPageFlight />} />} />
    </Routes>
  );
};

export default Router;
