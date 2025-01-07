import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import createAxiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const refreshToken = async () => {
    try {
      console.log("trying to refresh token");
      const response = await axios.post(
        "http://localhost:5002/api/auth/refresh",
        {
          refreshToken: localStorage.getItem("refreshToken"),
        }
      );
      console.log("set token as ", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      loadUser(response.data.accessToken);
      return response.data.accessToken;
    } catch (err) {
      console.error("Failed to refresh token: ", err);
      logout();
    }
  };

  const loadUser = async (token = accessToken) => {
    if (!token) {
      // console.log("Access token missing, attempting refresh...");
      // await refreshToken();
      console.log("no token no token");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5002/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Error loading user:", err);
      if (err.response?.status === 401) {
        console.log("Refreshing token after 401...");
        await refreshToken();
      } else {
        logout();
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/login",
        { email, password }
      );
      const { accessToken, refreshToken } = response.data;

      // Save tokens
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      loadUser(accessToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const register = async (username, email, password) => {
    try {
      await axios.post("http://localhost:5002/api/auth/register", {
        username,
        email,
        password,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // An axios instance that can retry once access token is expired
  const axiosInstance = createAxiosInstance(refreshToken);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth...");
      await loadUser();
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        login,
        logout,
        register,
        refreshToken,
        axiosInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
