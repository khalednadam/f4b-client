"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Settings, X } from "lucide-react";
import NavBarItem from "./NavBarItem";
import { AnimatePresence, motion } from "framer-motion";
import useDisplay from "@/utils/useDisplay";
import { useMobileSideBarStore } from "@/store/mobileSideBar";
import SideNavBarMenuItems from "./SideNavBarMenuItems";
import MinimizeSideBarButton from "./MinimizeSideBarButton";
import UserProfileHead from "../UserProfileHead";
import { useSession } from "next-auth/react";

const SideNavBar = () => {
  const mdAndUp = useDisplay();
  const { data: session } = useSession();
  const isOpen = useMobileSideBarStore((state: any) => state.isOpen);
  const toggleIsOpen = useMobileSideBarStore(
    (state: any) => state.toggleIsOpen
  );

  const [isMini, setIsMini] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("f4bSidebar");
      return savedState ? JSON.parse(savedState) : true;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("f4bSidebar", JSON.stringify(isMini));
    }
  }, [isMini]);
  return (
    <>
      {mdAndUp ? (
        <motion.div
          className={`h-full border-r-2 min-h-screen sticky top-0 flex flex-col p-4 space-y-10`}
          animate={{
            width: isMini ? "75px" : "300px",
          }}
          initial={{ width: isMini ? "75px" : "300px" }}
          transition={{ duration: 0.7 }}
        >
          <UserProfileHead
            avatar={session?.user.image}
            username={session?.user.username}
            isMini={isMini}
          />
          <div className="grow flex flex-col text-start justify-center space-y-1">
            <SideNavBarMenuItems isMini={isMini} />
          </div>
          <NavBarItem
            Icon={<Settings />}
            Text="Settings"
            isMini={isMini}
            to="/settings"
          />
          <MinimizeSideBarButton isMini={isMini} setIsMini={setIsMini} />
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="w-screen h-screen bg-black/50 absolute z-[9999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
                  className={`h-full w-10/12 border-r-2 top-0 flex flex-col bg-background p-4 sticky`}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.1 }}
                >
                  <UserProfileHead
                    avatar={session?.user.image}
                    username={session?.user.username}
                    isMini={false}
                  />
                  <div className="grow flex flex-col text-start justify-center">
                    <SideNavBarMenuItems />
                  </div>
                  <div>
                    <NavBarItem
                      Icon={<Settings />}
                      Text="Settings"
                      to="/settings"
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
