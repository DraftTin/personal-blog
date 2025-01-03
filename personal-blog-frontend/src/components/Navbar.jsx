import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:underline">
          Personal Blog
        </Link>
        <div>
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user.username}</span>
              <Link
                to="/editor"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 mr-4"
              >
                Create New Blog
              </Link>
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 mr-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
