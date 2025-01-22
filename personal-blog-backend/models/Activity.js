import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, // e.g., 'created', 'updated', 'deleted'
  resource: { type: String, required: true }, // e.g., 'blog'
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", activitySchema);
