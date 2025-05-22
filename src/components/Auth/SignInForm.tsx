"use client";
import React, { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={loading} className="btn btn-primary w-full">
        {loading ? "Sending magic link..." : "Sign In"}
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
