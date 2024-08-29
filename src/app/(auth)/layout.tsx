"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../globals.css";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [isLogin, setIsLogin] = useState(path === "/login");
  useEffect(() => {
    setIsLogin(path === "/login");
  }, [path]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-primary/70">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        {children}
      </Card>
    </main>
  );
}
