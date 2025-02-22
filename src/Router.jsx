import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Tickets from "./pages/Tickets";
//import Scanner from "./pages/QRScanner";
import Dashboard from "./pages/Dashboard";
import AvailableTrains from "./pages/AvailableTrains";
import PaymentPage from "./pages/Payment";
import AvailableBuses from "./pages/AvailableBuses";
import PaymentPageBus from "./pages/PaymentBuses";
import PaymentPageFlight from "./pages/PaymentFlight";
import AvailableFlights from "./pages/AvailableFlights";
import TicketDetails from "./components/TicketDetails";
import UserList from "./pages/user";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";

const ProtectedRoute = ({ user, element }) => {
  console.log("ProtectedRoute user:", user);

  if (user === undefined) {
    return <div>Loading...</div>; // Avoid redirecting too early
  }

  return user ? element : <Navigate to="/login" replace />;
};
// const ProtectedRoute = ({ user, element }) => {
//   console.log("checking", user);

//   return user ? element : <Navigate to="/login" replace />;
// };
// const ProtectedRoute = ({ element }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false); // Stop loading when auth state is resolved
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state until auth is resolved
//   }

//   return user ? element : <Navigate to="/signup" replace />;
// };

// const ProtectedRoute = ({ element }) => {
//   const [user, setUser] = useState(null);
//   const auth = getAuth();

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (user) => {
//   //     setUser(user);
//   //   });
//   //   return () => unsubscribe();
//   // }, [auth]);
//   let usr = auth.currentUser;

//   return usr ? element : <Navigate to="/signup" replace />;
// };
// import TicketDetails from "./components/TicketDetails";

const Router = ({ user }) => {
  console.log("Router user:", user);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" /> : <SignUp />}
      />

      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route
          path="/tickets"
          element={<ProtectedRoute user={user} element={<Tickets />} />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> */}
        <Route
          path="/available-trains"
          element={<ProtectedRoute user={user} element={<AvailableTrains />} />}
        />
        <Route
          path="/available-buses"
          element={<ProtectedRoute user={user} element={<AvailableBuses />} />}
        />
        <Route
          path="/available-flights"
          element={
            <ProtectedRoute user={user} element={<AvailableFlights />} />
          }
        />
        <Route
          path="/payment"
          element={<ProtectedRoute user={user} element={<PaymentPage />} />}
        />
        <Route
          path="/payment-bus"
          element={<ProtectedRoute user={user} element={<PaymentPageBus />} />}
        />
        <Route
          path="/payment-flight"
          element={
            <ProtectedRoute user={user} element={<PaymentPageFlight />} />
          }
        />
        <Route path="/ticket-details" element={<TicketDetails />} />
        <Route path="/users" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default Router;
