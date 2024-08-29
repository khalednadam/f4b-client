import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch("http://localhost:3000/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.user.refresh_token}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();
  return {
    ...token,
    response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(`http://localhost:3000/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        console.log(user);
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, user };
      if (new Date().getTime() < token.user.expiration_time) return token;
      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
