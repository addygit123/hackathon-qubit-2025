import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Tickets from "./pages/Tickets";
import Scanner from "./pages/Scanner";
import Dashboard from "./pages/Dashboard";
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
    </Routes>
  );
};

export default Router;
