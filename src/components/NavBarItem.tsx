import React from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface NavBarItemProps {
  isMini: boolean;
  Icon: React.ReactNode;
  Text: string;
}

const NavBarItem = ({ isMini, Icon, Text }: NavBarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={`gap-2 justify-start`}
      size={isMini ? "icon" : "default"}
    >
      <div className={`${isMini && "flex justify-center items-center mx-2"}`}>
        {Icon}
      </div>

      <AnimatePresence>
        {!isMini && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {Text}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default NavBarItem;
