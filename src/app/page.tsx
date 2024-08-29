"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const onSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 break-all">
      <p>{session?.user.username}</p>
      <Button variant="destructive" onClick={onSignOut}>
        Sign out
      </Button>
    </main>
  );
}
