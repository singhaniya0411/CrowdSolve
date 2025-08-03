import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import problemRoute from "./routes/problemRoute.js";
import solutionRoute from "./routes/solutionRouter.js";
import commentRoute from "./routes/commentRoute.js";
import path from 'path';


dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "https://crowdsolve-frontend.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/problem", problemRoute);
app.use("/api/solutions", solutionRoute);
app.use("/api/comments", commentRoute);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("CrowdSolve APIS system is working");
})



app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
})

