import express from "express";
import { addComment, getComments } from "../controller/commentController.js";
import verify from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:solutionId", verify, addComment);
router.get("/:solutionId", getComments);

export default router;
