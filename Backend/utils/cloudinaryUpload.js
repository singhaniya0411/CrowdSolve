// backend/utils/cloudinaryUpload.js
import cloudinary from "../config/cloudinary.js";
import streamifier from 'streamifier'

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "CrowdSolveProblems" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};


export default uploadToCloudinary;