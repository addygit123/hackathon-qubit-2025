import Navbar from "./Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar /> {/* Navbar is now on all pages */}
      <Outlet /> {/* Renders the current route */}
    </>
  );
};

export default Layout;
