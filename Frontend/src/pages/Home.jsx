import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios.js";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const res = await axios.get("/problem");
        setProblems(res.data);
      } catch (error) {
        console.error("Error while fetching problem", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-extrabold text-gray-900">Problems</h1>
            <p className="mt-2 text-sm text-gray-600">
              Browse through community-submitted problems and share your
              solutions
            </p>
          </div>
          <Link
            to="/post"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Post a Problem
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : problems.length === 0 ? (
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
              No problems yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Be the first to post a challenge!
            </p>
            <div className="mt-6">
              <Link
                to="/post"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Post a Problem
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {problems.map((prob) => (
                <div
                  key={prob._id}
                  onClick={() => navigate(`/problem/${prob._id}`)}
                  className="flex flex-col rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200"
                >
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                          {prob.title}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                          {prob.upvotes} upvotes
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                        {prob.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-500">
                          {prob.postedBy?.name || "Anonymous"}
                        </p>
                      </div>
                      <div className="text-sm text-green-600 hover:text-green-500 font-medium">
                        View solutions →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
