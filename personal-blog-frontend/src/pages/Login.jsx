import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateFields } from "../utils/validation";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFields([
      { name: "email", value: email, required: true },
      { name: "password", value: password, required: true },
    ]);
    if (Object.keys(errors).length > 0) {
      setError(errors[Object.keys(errors)[0]]);
      return;
    }
    try {
      await login(email, password);
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Login
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
