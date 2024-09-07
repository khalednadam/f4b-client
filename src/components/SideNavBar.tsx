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
  X,
} from "lucide-react";
import NavBarItem from "./NavBarItem";
import { AnimatePresence, motion } from "framer-motion";
import useDisplay from "@/utils/useDisplay";
import { useMobileSideBarStore } from "@/store/mobileSideBar";

const SideNavBar = () => {
  const mdAndUp = useDisplay();
  const isOpen = useMobileSideBarStore((state: any) => state.isOpen);
  const toggleIsOpen = useMobileSideBarStore(
    (state: any) => state.toggleIsOpen
  );

  const [isMini, setIsMini] = useState<boolean>(() => {
    const savedState = localStorage.getItem("f4bSidebar");
    return savedState ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    localStorage.setItem("f4bSidebar", JSON.stringify(isMini));
  }, [isMini]);

  return (
    <>
      {mdAndUp ? (
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
          <AnimatePresence>
            <Button
              onClick={() => setIsMini(!isMini)}
              size="icon"
              variant="secondary"
              className="absolute bottom-20 -right-5 rounded-full z-50 "
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
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="w-screen h-screen bg-black/50 absolute z-[9999]"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Button
                  onClick={toggleIsOpen}
                  size="icon"
                  className="absolute right-5 top-5"
                  variant="link"
                >
                  <X color="white" />
                </Button>
                <motion.div
                  className={`h-full w-2/3 border-r-2 top-0 flex flex-col bg-background p-4 sticky`}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="grow flex flex-col text-start justify-start">
                    <NavBarItem Icon={<Home />} Text="Home" isMini={false} />
                    <NavBarItem
                      Icon={<TrendingUp />}
                      Text="Trending"
                      isMini={false}
                    />
                    <NavBarItem
                      Icon={<Search />}
                      Text="Search"
                      isMini={false}
                    />
                    <NavBarItem
                      Icon={<Bookmark />}
                      Text="Saved"
                      isMini={false}
                    />
                    <NavBarItem Icon={<User />} Text="Profile" isMini={false} />
                  </div>
                  <div>
                    <NavBarItem
                      Icon={<Settings />}
                      Text="Settings"
                      isMini={false}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default SideNavBar;
