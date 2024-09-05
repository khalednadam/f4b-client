import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 py-4 px-2 z-50">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <ul className="flex items-center justify-center space-x-1">
            <Button variant="ghost">Link one</Button>
            <Button variant="ghost">Link two</Button>
            <Button variant="ghost">Link three</Button>
            <Button variant="ghost">Link four</Button>
            <SignOutButton />
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;
