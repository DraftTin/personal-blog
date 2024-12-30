import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// create a blog
router.post("/create", async (req, res) => {
  try {
    const hasAllKeys = ["title", "content"].every((key) => key in req.body);
    if (hasAllKeys == false) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit;

    // Fuzzy Search
    const query = search
      ? {
          $or: [
            { title: new RegExp(search, "i") },
            { content: new RegExp(search, "i") },
            req.query.category && { category: req.query.category },
          ],
        }
      : {};
    const sortBy = req.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const blogs = await Blog.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    const totalBlogs = await Blog.countDocuments(query);

    res.status(200).json({
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get a blog by ID
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Error fetching blog by ID" });
  }
});

// Update a blog by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
});

// Delete a blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
});

export default router;
