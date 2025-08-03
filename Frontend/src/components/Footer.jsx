import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactLinks = [
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/vishal-singhaniya-b959482b9",
      label: "LinkedIn",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      url: "mailto:vishalsinghaniya000@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="flex space-x-6">
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.01 }}
                className="text-gray-500 hover:text-green-600 transition"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            &copy; {currentYear} Vishal Singhaniya. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
