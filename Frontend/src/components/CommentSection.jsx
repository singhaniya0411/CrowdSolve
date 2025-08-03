import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";

const CommentSection = ({ solutionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/comments/${solutionId}`);
      setComments(res.data || []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (solutionId) {
      fetchComments();
    }
  }, [solutionId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setError("");
      const token = localStorage.getItem("token");
      await axios.post(
        `/comments/${solutionId}`,
        { comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Failed to post comment", error);
      setError(error.response?.data?.message || "Failed to post comment");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-800">Comments</h4>
        <span className="text-sm text-gray-500">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-500 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {isLoading && comments.length === 0 ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                        {comment.author?.name?.charAt(0) || "U"}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                          {comment.author?.name || "Anonymous"}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4 text-sm text-gray-500 bg-gray-50 rounded-lg"
              >
                No comments yet. Be the first to comment!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              Y
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a comment..."
              rows="2"
              className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            <div className="mt-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  newComment.trim()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Post Comment
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
