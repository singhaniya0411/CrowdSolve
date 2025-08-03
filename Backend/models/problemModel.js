import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 120,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  imageUrl: {
    type: String,
    default: "",

  }
  , location: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  tags: [String]
}, { timestamps: true });

export default mongoose.model("Problem", problemSchema);