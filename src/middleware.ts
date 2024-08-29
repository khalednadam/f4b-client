// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If the user is authenticated, redirect from /login and /signup to /
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not authenticated, redirect from protected routes to /login
  if (!token && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Protect routes and apply the middleware
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"], // Include protected and auth pages
};
