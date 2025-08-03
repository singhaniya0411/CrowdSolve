import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios.js";
import PostSolutionForm from "../components/PostSolution.jsx";
import CommentSection from "../components/CommentSection.jsx";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState("problem");

  const getSolutionById = async () => {
    try {
      const res = await axios.get(`/solutions/${id}`);
      setSolutions(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching solution of this problem!", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProblemById = async () => {
      try {
        const res = await axios.get(`/problem/${id}`);
        setProblem(res.data);
      } catch (error) {
        console.error("Error while fetching details of problem!", error);
      }
    };

    getProblemById();
    getSolutionById();
  }, [id]);

  if (!problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Problem Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {problem.title}
            </h1>
            <p className="mt-2 text-sm text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Posted by: {problem.postedBy?.name || "Anonymous"}
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {problem.tags || "General"}
          </span>
        </div>

        {/* Problem Image */}
        {problem.imageUrl && (
          <div className="mt-4">
            <img
              src={problem.imageUrl}
              alt="Problem"
              className="w-full h-auto max-h-96 object-contain rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setImage(problem.imageUrl);
                setModal(true);
              }}
            />
          </div>
        )}

        {/* Problem Description */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded">
            {problem.description}
          </p>
        </div>

        {/* Location */}
        {problem.location && (
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <svg
              className="w-5 h-5 mr-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {problem.location}
          </div>
        )}
      </div>

      <div className="justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Solutions</h2>
        <PostSolutionForm onSuccess={getSolutionById} />
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${"border-green-500 text-green-600"}`}
          >
            Solutions ({solutions.length})
          </button>
        </nav>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : solutions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No solutions yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Be the first to propose a solution to this problem
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {solutions.map((solution) => (
              <div
                key={solution._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6 border border-green-400 rounded-lg shadow-[60px]">
                  {/* Solution Content */}
                  <p className="text-gray-700 whitespace-pre-line">
                    {solution.solution}
                  </p>

                  {/* Solution Image */}
                  {solution.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={solution.imageUrl}
                        alt="Solution"
                        className="w-full h-auto max-h-80 object-contain rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => {
                          setImage(solution.imageUrl);
                          setModal(true);
                        }}
                      />
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(solution.createdAt).toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {solution.author?.name || "Anonymous"}
                    </div>
                  </div>

                  {/* Upvote Section */}
                  <div className="mt-4 flex items-center">
                    <button
                      className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem("token");
                          await axios.post(
                            `/solutions/upvote/${solution._id}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          getSolutionById();
                        } catch (error) {
                          console.error("Failed to upvote", error);
                        }
                      }}
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      Upvote ({solution.upvotes?.length || 0})
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-6 border-t pt-4">
                    <CommentSection solutionId={solution._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={image}
              alt="Preview"
              className="max-h-[90vh] max-w-full mx-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;
