import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { validateFields } from "../utils/validation";

const Profile = () => {
  const { user, accessToken, logout, axiosInstance } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar || ""); // Initialize with user avatar

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar); // Ensure avatar is updated when user changes
    }
  }, [user]);

  // handle avatar change
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axiosInstance.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("okokokokokokoko");
      console.log(response.data);
      setAvatar(response.data.avatar); // Update avatar URL after upload
      console.log("qppqpqpqpqpq");
      setMessage("Avatar updated successfully!");
      console.log(avatar);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      setMessage("Failed to upload avatar. Please try again.");
    }
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      console.log(accessToken);
      const response = await axios.put(
        "http://localhost:5002/api/users/me",
        { username, email },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    try {
      const errors = validateFields([
        { name: "Current Password", value: password, required: true },
        { name: "New Password", value: newPassword, required: true },
      ]);
      console.log(Object.keys(errors).length);
      if (Object.keys(errors).length > 0) {
        setMessage(errors[Object.keys(errors)[0]]);
        return;
      }
      const response = await axiosInstance.put(
        "/users/change-password",
        {
          password, // Current password
          newPassword, // New password
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // Include authorization header
        }
      );
      setMessage("Password changed successfully!");
      setPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to change password. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Profile
      </h1>

      {avatar ? (
        <img
          src={avatar}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 border border-gray-300"
        />
      ) : (
        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-300 flex items-center justify-center">
          <span>No Avatar</span>
        </div>
      )}

      <div className="text-center mb-4">
        <input
          type="file"
          onChange={handleAvatarChange}
          className="block mx-auto mt-4"
        />
      </div>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        {editMode ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded"
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="ml-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">
              <strong>Username:</strong> {username}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {email}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </>
        )}

        <hr className="my-6" />

        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Change Password
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </div>

        <hr className="my-6" />

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
