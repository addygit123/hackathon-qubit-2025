import React from "react";
import { Routes, Route } from "react-router-dom";
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
import { getAuth } from "firebase/auth"; 
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser;
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
      <Route path="/available-trains" element={<AvailableTrains />} />
      <Route path="/available-buses" element={<AvailableBuses />} />
      <Route path="/available-flights" element={<AvailableFlights />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-bus" element={<PaymentPageBus />} />
      <Route path="/payment-flight" element={<PaymentPageFlight />} />
    </Routes>
  );
};

export default Router;
