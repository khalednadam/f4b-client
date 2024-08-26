import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    access_token: string;
    refresh_token: string;
  }
  interface Session {
    user: User;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      accessToken: string;
      refreshToken: string;
      role: string;
    };
  }
}
