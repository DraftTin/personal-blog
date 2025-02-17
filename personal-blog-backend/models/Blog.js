import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, default: "Others" },
  },
  // createdAt & updatedAt fields
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
