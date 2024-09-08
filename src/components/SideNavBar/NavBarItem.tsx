import React from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarItemProps {
  isMini?: boolean;
  Icon: React.ReactNode;
  Text: string;
  to: string;
}

const NavBarItem = ({ isMini = false, Icon, Text, to }: NavBarItemProps) => {
  const pathName = usePathname();
  return (
    <Link href={to}>
      <Button
        variant={pathName === to ? "secondary" : "ghost"}
        className={`gap-2 justify-start w-full`}
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
              transition={{ duration: 0.1 }}
            >
              {Text}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </Link>
  );
};

export default NavBarItem;
