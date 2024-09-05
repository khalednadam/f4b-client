import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/providers/AuthProvider";
import Header from "@/components/Header";
import Container from "@/components/Container";

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
        <Header />
        <AuthProvider>
          <Container>{children}</Container>
        </AuthProvider>
      </body>
    </html>
  );
}
