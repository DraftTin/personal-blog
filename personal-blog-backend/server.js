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

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
