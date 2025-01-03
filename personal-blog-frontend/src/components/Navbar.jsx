// Navbar Component
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:underline">
          Personal Blog
        </Link>
        <Link
          to="/editor"
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          Create New Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
