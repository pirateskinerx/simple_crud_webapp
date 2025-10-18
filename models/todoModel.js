import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite in serverless (Next/Vercel)
export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
