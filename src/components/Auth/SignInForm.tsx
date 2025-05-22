"use client";
import React, { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
    setIsSuccess(res.ok);

    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              required
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? "Sending magic link..." : "Sign In"}
          </button>
          {message && (
            <p
              className={`mt-2 text-center ${
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
