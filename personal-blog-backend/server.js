import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.use(errorHandler);

// Simple routes
app.get("/", (req, res) => {
  res.send("Welcome to the Personal Blog Backend!");
});

app.post("/api/blogs", (req, res) => {
  const newBlog = req.body;
  console.log(req.body);
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
