import Solution from "../models/solutionModel.js";
import mongoose from "mongoose";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const createSolution = async (req, res) => {
  try {

    const { solution } = req.body;
    console.log("User from token middleware:", req.user);

    const { problemId } = req.params;

    const newSolution = new Solution({
      solution,
      problem: problemId,
      author: req.user.id,

    });

    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    newSolution.imageUrl = imageUrl;
    await newSolution.save();

    res.status(201).json(newSolution);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
    console.log("While creating Solution facing some error : ", error);
  }
};


export const findSolutionById = async (req, res) => {
  try {
    const solutions = await Solution.find({ problem: new mongoose.Types.ObjectId(req.params.problemId), }).populate("author", "name email");

    if (!solutions || solutions.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(solutions);

  }
  catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /solutions/upvote/:id
export const upvoteSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    const userId = req.user.id; // Make sure you're using auth middleware

    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    const alreadyUpvoted = solution.upvotes.includes(userId);

    if (alreadyUpvoted) {
      // Remove user ID from upvotes
      solution.upvotes = solution.upvotes.filter(
        (uid) => uid.toString() !== userId
      );
    } else {
      // Add user ID to upvotes
      solution.upvotes.push(userId);
    }

    await solution.save();

    return res.status(200).json({
      message: alreadyUpvoted ? "Upvote removed" : "Upvoted successfully",
      upvotes: solution.upvotes.length,
    });
  } catch (error) {
    console.error("Upvote error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
