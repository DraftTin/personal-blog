// File: routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

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
