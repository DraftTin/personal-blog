import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route example
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user, // This comes from the decoded token
  });
});

export default router;
