import React from "react";
import { Button } from "./ui/button";

interface NavBarItemProps {
  isMini: Boolean;
  Icon: React.ReactNode;
  Text: String;
}

const NavBarItem = ({ isMini, Icon, Text }: NavBarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={`w-full gap-2 ${isMini ? "justify-center" : "justify-start"}`}
      size={isMini ? "icon" : "default"}
    >
      {Icon}
      {!isMini && Text}
    </Button>
  );
};

export default NavBarItem;
