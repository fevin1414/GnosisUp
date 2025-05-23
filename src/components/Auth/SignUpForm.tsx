"use client";
import React, { useState } from "react";

export default function SignUpForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isAdmin = role === "ORGANIZATION_ADMIN" || role === "ENTERPRISE_ADMIN";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        role,
        orgName: isAdmin ? orgName : null,
      }),
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md p-6 bg-white rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          required
          placeholder="First Name"
          className="input input-bordered w-full"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          required
          placeholder="Last Name"
          className="input input-bordered w-full"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="ORGANIZATION_ADMIN">Organization (1–50 users)</option>
          <option value="ENTERPRISE_ADMIN">Enterprise (51+ users)</option>
        </select>

        {isAdmin && (
          <input
            type="text"
            required
            placeholder="Organization/Enterprise Name"
            className="input input-bordered w-full"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        )}

        <button
          disabled={loading}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {message && (
          <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
