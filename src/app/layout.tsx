import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import SignInButton from "@/components/SignInButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "f4b",
  description: "Front4back | f4b.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SignInButton />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
