import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const { user, setUser } = useAuth();
  const [countdown, setCountdown] = useState(0);

  // Redirect to login if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // countdown timer for resend-OTP button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/verify-otp",
        { email, otp }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUser(response.data.user);
      navigate("/"); // Redirect to Home Page on success
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to verify OTP");
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    setIsResendDisabled(true); // Temporarily disable the button
    setCountdown(60);
    setResendMessage("Sending OTP...");

    try {
      await axios.post("http://localhost:5002/api/auth/resend-otp", { email });
      setResendMessage("OTP sent to your email.");
    } catch (error) {
      setResendMessage("Failed to resend OTP. Please try again.");
      setIsResendDisabled(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Verify OTP</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border border-gray-300 p-3 rounded bg-gray-100"
          />
        </div>
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResendDisabled || countdown > 0}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            {countdown > 0 ? `Resend OTP (${countdown}s)` : "Send OTP"}
          </button>
        </div>
        {resendMessage && (
          <p className="text-green-500 text-sm mt-2">{resendMessage}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded w-full mt-4"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
