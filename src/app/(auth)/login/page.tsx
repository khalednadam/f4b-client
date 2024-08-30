"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { signIn } from "next-auth/react";
import { CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import httpStatus from "http-status";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { toast } = useToast();
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async () => {
    const res = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });
    if (!res?.ok) {
      toast({
        title: "Failed",
        description: "Email or password is wrong!",
        variant: "destructive",
      });
      return null;
    }
    router.push("/");
  };

  return (
    <>
      <CardContent>
        <form onSubmit={onSubmit}>
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
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col w-full">
        <Link href="/signup">
          <Button variant="link">Don't have an account? Create one</Button>
        </Link>

        <Button className="w-full" onClick={onSubmit}>
          Login
        </Button>
      </CardFooter>
    </>
  );
};

export default LoginPage;
