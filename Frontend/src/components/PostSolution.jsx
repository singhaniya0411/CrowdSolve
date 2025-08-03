import React, { useState } from "react";
import axios from "../api/axios";
import { FaPaperclip, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const PostSolutionForm = ({ onSuccess }) => {
  const [solution, setSolution] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!solution.trim()) {
      setError("Solution text cannot be empty");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    const problemId = window.location.pathname.split("/").pop();

    const formData = new FormData();
    formData.append("solution", solution.trim());
    formData.append("problemId", problemId);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`/solutions/${problemId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSolution("");
      setImage(null);
      setFileName("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to post solution:", error);
      setError(error.response?.data?.message || "Failed to post solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setFileName(file.name);
      setError("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Post Your Solution
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Describe your solution in detail..."
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Attach Image (Optional)
          </label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition">
              <FaPaperclip className="mr-2" />
              {fileName || "Choose file"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {fileName && (
              <span className="ml-3 text-sm text-gray-500 truncate max-w-xs">
                {fileName}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">Supports JPG, PNG (Max 5MB)</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || !solution.trim()}
          className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting || !solution.trim()
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Posting...
            </>
          ) : (
            "Post Solution"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PostSolutionForm;
