"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";
import NavBarItem from "./NavBarItem";
import { motion } from "framer-motion";

const SideNavBar = () => {
  const [isMini, setIsMini] = useState<boolean>(() => {
    const savedState = localStorage.getItem("f4bSidebar");
    return savedState ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    localStorage.setItem("f4bSidebar", JSON.stringify(isMini));
  }, [isMini]);

  return (
    <motion.div
      className={`h-full border-r-2 min-h-screen sticky top-0 flex flex-col p-4`}
      animate={{
        width: isMini ? "75px" : "200px",
      }}
      initial={{ width: isMini ? "75px" : "200px" }}
      transition={{ duration: 0.2 }}
    >
      <div className="grow flex flex-col text-start justify-start">
        <NavBarItem Icon={<Home />} Text="Home" isMini={isMini} />
        <NavBarItem Icon={<TrendingUp />} Text="Trending" isMini={isMini} />
        <NavBarItem Icon={<Search />} Text="Search" isMini={isMini} />
        <NavBarItem Icon={<Bookmark />} Text="Saved" isMini={isMini} />
        <NavBarItem Icon={<User />} Text="Profile" isMini={isMini} />
      </div>
      <div>
        <NavBarItem Icon={<Settings />} Text="Settings" isMini={isMini} />
      </div>
      <Button
        onClick={() => setIsMini(!isMini)}
        size="icon"
        variant="secondary"
        className="absolute bottom-20 -right-5 rounded-full z-50 "
      >
        {isMini ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </motion.div>
  );
};

export default SideNavBar;
