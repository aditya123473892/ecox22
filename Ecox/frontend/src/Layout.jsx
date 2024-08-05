// src/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Example from "./Components/NewNav";
import Footer from "./Components/Footer";

const Layout = () => {
  return (
    <div>
      <Example />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
