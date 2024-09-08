import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface MinimizeSideBarButtonProps {
  isMini: boolean;
  setIsMini(isMini: boolean): void;
}

const MinimizeSideBarButton = ({
  isMini,
  setIsMini,
}: MinimizeSideBarButtonProps) => {
  return (
    <AnimatePresence>
      <Button
        onClick={() => setIsMini(!isMini)}
        size="sm"
        variant="secondary"
        className="absolute bottom-20 -right-4 rounded-full z-50 w-8 h-8"
      >
        <motion.div
          animate={{
            rotate: isMini ? "0deg" : "180deg",
          }}
          initial={{ rotate: isMini ? "0deg" : "180deg" }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="mx-auto" />
        </motion.div>
      </Button>
    </AnimatePresence>
  );
};

export default MinimizeSideBarButton;
