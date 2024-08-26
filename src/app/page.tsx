"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 break-all">
      {JSON.stringify(session)}
      {session && session.user ? (
        <p>{session.user.name}</p>
      ) : (
        <p>{JSON.stringify(session?.user)}</p>
      )}
    </main>
  );
}
