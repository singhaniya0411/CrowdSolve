import mongoose from "mongoose";
import Solution from "./solutionModel.js"
import User from "./userModel.js";

const commentSchema = new mongoose.Schema({

  solution:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Solution",
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema)
