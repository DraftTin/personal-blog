// File: routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Activity from "../models/Activity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars/"); // Save files in the "uploads/avatars" directionary
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}.jpg`);
  },
});

const upload = multer({ storage });

// Route to upload a profile picture
router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the avatar URL
    user.avatar = `/api/users/avatar/${req.user.id}?t=${new Date().getTime()}`;
    await user.save();

    res.status(200).json({ avatar: user.avatar });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get avatar by ID
router.get("/avatar/:id", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads/avatars",
    `${req.params.id}.jpg`
  );
  // check if the file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Respond with a default avatar if the file does not exist
    const defaultAvatar = path.join(
      __dirname,
      "../uploads/avatars/default.jpg"
    );
    res.sendFile(defaultAvatar);
  }
});

// Update User Information
router.put("/me", protect, async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Change Password
router.put("/change-password", protect, async (req, res) => {
  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    user.password = newPassword; // Update the password
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
});

// Get user activity log
router.get("/activity", protect, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .populate("resourceId", "title"); // Populate blog titles for better context

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activity log:", error);
    res.status(500).json({ message: "Error fetching activity log" });
  }
});

export default router;
