"use client";
import React, { useState } from "react";
import { signInSchema, validateClient } from "../../../utils/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const validated = validateClient(signInSchema, { email });

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      const data = await res.json();
      setIsSuccess(res.ok);
      setMessage(res.ok ? data.message : data.error || "Something went wrong");
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-lg rounded-2xl border border-border">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-full" disabled={loading}>
            {loading ? "Sending magic link..." : "Sign In"}
          </Button>
          {message && (
            <p
              className={`text-center text-sm ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
