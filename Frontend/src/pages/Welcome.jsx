import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-5"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-green-500 mb-2">
          CrowdSolve
        </h1>
        <p className="text-xl text-green-400">
          Post Problems. Find Solutions. Together.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8"
      >
        <p className="text-lg sm:text-xl text-green-500 mb-8 leading-relaxed">
          CrowdSolve connects problem solvers with those who need solutions.
          Share your challenges and collaborate with a community ready to help.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all border  border-green-500 duration-300"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-transparent border  shadow-lg hover:shadow-xl border-green-500  text-green-500 font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Login
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl"
      >
        {[
          {
            icon: (
              <svg
                className="w-10 h-10 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            ),
            text: "Innovative Solutions",
          },
          {
            icon: (
              <svg
                className="w-10 h-10 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            ),
            text: "Community Powered",
          },
          {
            icon: (
              <svg
                className="w-10 h-10 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            ),
            text: "Fast Responses",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-green-500 rounded-lg p-4 backdrop-blur-sm"
          >
            {item.icon}
            <p className="mt-2 text-green-500 font-medium">{item.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Welcome;
