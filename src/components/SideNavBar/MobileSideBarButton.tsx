"use client";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useMobileSideBarStore } from "@/store/mobileSideBar";
import useDisplay from "@/utils/useDisplay";

const MobileSideBarButton = () => {
  const mdAndUp = useDisplay();
  const toggleIsOpen = useMobileSideBarStore(
    (state: any) => state.toggleIsOpen
  );

  return (
    !mdAndUp && (
      <Button onClick={() => toggleIsOpen()} size="icon" variant="outline">
        <Menu />
      </Button>
    )
  );
};

export default MobileSideBarButton;
