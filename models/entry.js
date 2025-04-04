import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  mood: String,
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  journalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journal",
    required: true,
  },
});
