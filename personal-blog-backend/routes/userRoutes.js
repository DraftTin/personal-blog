// File: routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars/"); // Save files in the "uploads/avatars" directionary
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}-${file.originalname}`);
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
    user.avatar = `${req.protocol}://${req.get("host")}/uploads/avatars/${
      req.file.filename
    }`;
    await user.save();

    res.status(200).json({ avatar: user.avatar });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ message: "Server error" });
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

export default router;
