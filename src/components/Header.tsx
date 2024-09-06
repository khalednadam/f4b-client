import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";
import { ThemeSwitch } from "./ui/ThemeSwitch";

const Header = () => {
  return (
    <header className="sticky top-0 py-4 px-10 z-50 border-b-2">
      <div className="flex justify-between items-center">
        <Logo />
        <ul className="flex items-center justify-center space-x-1">
          <ThemeSwitch />
          <SignOutButton />
        </ul>
      </div>
    </header>
  );
};

export default Header;
