"use client";
import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = ({ variant = "destructive" }: ButtonProps) => {
  const onSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };
  return (
    <Button variant={variant} onClick={onSignOut}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
