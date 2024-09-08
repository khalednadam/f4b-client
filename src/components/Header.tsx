import React from "react";
import Logo from "./Logo";
import SignOutButton from "./SignOutButton";
import { ThemeSwitch } from "./ui/ThemeSwitch";
import MobileSideBarButton from "./SideNavBar/MobileSideBarButton";

const Header = () => {
  return (
    <header className="sticky top-0 py-4 px-10 z-50 border-b-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MobileSideBarButton />
          <Logo />
        </div>
        <ul className="flex items-center justify-center space-x-1">
          <ThemeSwitch />
          <SignOutButton />
        </ul>
      </div>
    </header>
  );
};

export default Header;
