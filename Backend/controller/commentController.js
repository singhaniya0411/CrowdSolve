import Comment from "../models/commentModel.js";
import Solution from "../models/solutionModel.js";



export const addComment = async (req, res) => {
  try {
    const { solutionId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const newComment = new Comment({
      solution: solutionId,
      author: req.user.id,
      text: comment,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error while posting comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { solutionId } = req.params;

    const comments = await Comment.find({ solution: solutionId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
