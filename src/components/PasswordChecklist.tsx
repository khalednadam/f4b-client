import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PasswordChecklistProps {
  password: string;
}

export const PasswordChecklist = ({ password }: PasswordChecklistProps) => {
  const requirements = [
    { test: /[a-z]/, message: "Contains lowercase letter" },
    { test: /[A-Z]/, message: "Contains uppercase letter" },
    { test: /[0-9]/, message: "Contains number" },
    { test: /[^\w\s]/, message: "Contains special character" },
    { test: /^.{8,}$/, message: "At least 8 characters long" },
  ];
  const container = {
    hidden: { opacity: 0 },
    exit: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.ul
        layout
        className="mt-2 text-sm text-gray-500"
        variants={container}
        exit={{ opacity: 0 }}
        initial="hidden"
        animate="show"
      >
        {requirements.map((req, index) => (
          <motion.li
            variants={item}
            key={index}
            className={`flex items-center ${req.test.test(password) ? "text-green-500" : "text-red-500"}`}
          >
            {req.test.test(password) ? "✔" : "✘"} {req.message}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};
