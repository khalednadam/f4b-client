"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full max-w-sm">
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="your password"
            ></Input>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icon
                icon={isPasswordVisible ? "ph:eye-slash" : "ph:eye"}
                width={24}
              ></Icon>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
