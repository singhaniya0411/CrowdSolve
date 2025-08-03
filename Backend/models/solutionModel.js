import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true });

export default mongoose.model("Solution", solutionSchema);