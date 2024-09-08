import { Home, TrendingUp, Search, Bookmark, User, Plus } from "lucide-react";
import React from "react";
import NavBarItem from "./NavBarItem";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface SideNavBarMenuItemsProps {
  isMini?: boolean;
}

const SideNavBarMenuItems = ({ isMini = false }: SideNavBarMenuItemsProps) => {
  return (
    <>
      <NavBarItem Icon={<Home />} Text="Home" isMini={isMini} to="/" />
      <NavBarItem
        Icon={<TrendingUp />}
        Text="Trending"
        isMini={isMini}
        to="/trending"
      />
      <NavBarItem
        Icon={<Search />}
        Text="Search"
        isMini={isMini}
        to="/search"
      />
      <NavBarItem
        Icon={<Bookmark />}
        Text="Saved"
        isMini={isMini}
        to="/saved"
      />
      <NavBarItem
        Icon={<User />}
        Text="Profile"
        isMini={isMini}
        to="/profile"
      />
      <Button
        className={`gap-2 justify-start w-full items-center bg-foreground`}
        size={isMini ? "icon" : "default"}
      >
        <div className={`${isMini && "flex justify-center items-center mx-2"}`}>
          <Plus />
        </div>

        <AnimatePresence>
          {!isMini && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.1 }}
            >
              Add Project
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </>
  );
};

export default SideNavBarMenuItems;
