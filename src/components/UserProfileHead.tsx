import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AnimatePresence, motion } from "framer-motion";

interface UserProfileHeadProps {
  username?: string;
  avatar?: string;
  isMini: boolean;
}

const UserProfileHead = ({
  username,
  avatar,
  isMini,
}: UserProfileHeadProps) => {
  return (
    <div className="flex justify-start items-center gap-2 overflow-hidden">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {username?.slice(0, 2).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <AnimatePresence>
        {!isMini && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.1 }}
            className="overflow-hidden whitespace-nowrap"
          >
            @{username}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileHead;
