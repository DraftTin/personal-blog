import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar user={user} />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
