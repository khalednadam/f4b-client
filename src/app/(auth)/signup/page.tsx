"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";
import httpStatus from "http-status";

const SignUpPage = () => {
  const email = useRef("");
  const username = useRef("");
  const password = useRef("");
  const passwordVerification = useRef("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfimrationVisible, setIsConfirmationPasswordVisible] =
    useState(false);
  const onSubmit = async () => {
    const res = await fetch(`http://localhost:3000/users/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email.current,
        username: username.current,
        password: password.current,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== httpStatus.CREATED) {
      return null;
    }
    console.log(res);
    await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                onChange={(e) => (email.current = e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="@username"
                prefix="@"
                onChange={(e) => (username.current = e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative w-full max-w-sm">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="your password"
                  onChange={(e) => (password.current = e.target.value)}
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm_password">Re-enter Password</Label>
              <div className="relative w-full max-w-sm">
                <Input
                  id="confirm_password"
                  type={isPasswordConfimrationVisible ? "text" : "password"}
                  placeholder="Re-enter password"
                  onChange={(e) =>
                    (passwordVerification.current = e.target.value)
                  }
                ></Input>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  onClick={() =>
                    setIsConfirmationPasswordVisible(
                      !isPasswordConfimrationVisible
                    )
                  }
                >
                  <Icon
                    icon={
                      isPasswordConfimrationVisible ? "ph:eye-slash" : "ph:eye"
                    }
                    width={24}
                  ></Icon>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col w-full">
        <Link href="/login">
          <Button variant="link">Already have an account? Login</Button>
        </Link>

        <Button className="w-full" onClick={onSubmit}>
          Sign up
        </Button>
      </CardFooter>
    </>
  );
};

export default SignUpPage;
