import express from "express";
import verify from "../middleware/authMiddleware.js";
import { createSolution, findSolutionById, upvoteSolution } from "../controller/solutionController.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.post("/:problemId", verify, upload.single("image"), createSolution);
router.post('/upvote/:id', verify, upvoteSolution)


router.get("/:problemId", findSolutionById);

export default router;
