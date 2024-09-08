import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
    email: string;
    username: string;
    role: string;
    access_token: string;
    refresh_token: string;
    expiration_time: number;
    image?: string;
  }
  interface Session extends DefaultSession {
    user: User;
  }
}

import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User;
  }
}
