import Problem from "../models/problemModel.js";
import express from "express";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";


export const createProblem = async (req, res) => {
  try {
    const { title, description, location, tags, postedBy } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    req.body.imageUrl = imageUrl;

    const newProblem = new Problem({
      title,
      description,
      location,
      imageUrl,
      tags,
      postedBy
    })

    await newProblem.save();
    res.status(201).json({ newProblem });
  }
  catch (error) {
    console.error("Error in createProblem:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
}


export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().populate("postedBy", "name email").sort({ createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const findProblemById = async (req, res) => {
  try {
    console.log(req.params);
    const problem = await Problem.findById(req.params.id).populate("postedBy", "name email");

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });

    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}