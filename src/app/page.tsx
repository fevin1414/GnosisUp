"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">Welcome to GnosisUp</h1>
      <p>
        This is the Landing page signIn/SignUp other website part will be added
        to here now since no authentiation is done clicking the button would
        take us to dashboard
      </p>
      <Link href="/auth/signUp">
        <Button>SignUp</Button>
      </Link>
    </main>
  );
}
