"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <ModeToggle />
      <h1 className="text-3xl font-bold">Welcome to GnosisUp</h1>
      <p>
        This is the Landing page signIn/SignUp other website part will be added
        to here now since no authentiation is done clicking the button would
        take us to dashboard. I have added the Theme Toggle here because in dark
        mode the signIn and signup form are not visible
      </p>
      <p>If you dont have an account click here create your account</p>
      <Link href="/auth/signup">
        <Button>SignUp</Button>
      </Link>
      <p>
        If you have an account click on Login enter your email check your email
        for a signIn link click on it
      </p>
      <Link href="/auth/signin">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
