"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import "../globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from "framer-motion";
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
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-primary/70 overflow-hidden">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 90 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
                </CardHeader>
                <motion.div>{children}</motion.div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Toaster />
        </main>
      </body>
    </html>
  );
}
