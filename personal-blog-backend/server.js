import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(errorHandler);

// Enable open CORS for all origins and methods
app.use(
  cors({
    // origin: "http://localhost:5173", // Allow requests from the frontend
    origin: "*",
  })
);

// blog routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/users", userRoutes);

// Simple routes
app.get("/", (req, res) => {
  res.send("Welcome to the Personal Blog Backend!");
});

app.post("/api/blogs", (req, res) => {
  const newBlog = req.body;
  const hasAllKeys = ["title", "content"].every((key) => key in req.body);
  if (hasAllKeys == true) {
    blogs.push({ id: id, title: req.body.title, content: req.body.content });
    res
      .status(201)
      .json({ message: "okay, you have gotten it", blog: newBlog });
  } else {
    res.status(400).json({
      error: "Invalid JSON format",
      message: "Should contain 'title' and 'content' fields",
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
