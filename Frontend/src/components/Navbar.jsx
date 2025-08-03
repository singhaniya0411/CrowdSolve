import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaPlusCircle, FaUser } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" bg-gray-800 border-b text-white shadow-lg opacity-15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-green-400 transition-colors flex items-center"
          >
            <span className="bg-green-600 px-2 py-1 rounded mr-2">CS</span>
            CrowdSolve
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/post"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <FaPlusCircle className="mr-1" />
                  Post Problem
                </Link>

                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white">
                    <FaUser className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium hidden md:inline">
                    {user.user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors"
                >
                  <FaSignOutAlt className="mr-1" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
