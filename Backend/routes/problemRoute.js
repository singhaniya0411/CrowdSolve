import express from "express";
import verify from "../middleware/authMiddleware.js";
import { createProblem, getAllProblems, findProblemById } from "../controller/problemController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", verify, upload.single("image"), createProblem);
router.get("/", getAllProblems);
router.get("/:id", findProblemById);

export default router;