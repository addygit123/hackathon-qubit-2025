import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./Router";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user status changed", currentUser);

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Prevent redirecting until Firebase finishes
  }
  return (
    <BrowserRouter>
      <Router user={user} />
    </BrowserRouter>
  );
};

export default App;
