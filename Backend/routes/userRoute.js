import express from "express"
import verify from "../middleware/authMiddleware.js"
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)

export default router;