"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "../../../utils/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
  const router = useRouter();
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

    const payload = {
      first_name,
      last_name,
      email,
      role,
      orgName: isAdmin ? orgName : undefined,
    };

    const parsed = signUpSchema.safeParse(payload);
    if (!parsed.success) {
      setLoading(false);
      setMessage(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/auth/signin");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md p-6 bg-card rounded-2xl shadow-lg border border-border"
      >
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>

        <Input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <Label className="mb-1 block">Select Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">Student</SelectItem>
              <SelectItem value="TEACHER">Teacher</SelectItem>
              <SelectItem value="ORGANIZATION_ADMIN">
                Organization (1–50 users)
              </SelectItem>
              <SelectItem value="ENTERPRISE_ADMIN">
                Enterprise (51+ users)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isAdmin && (
          <Input
            type="text"
            placeholder="Organization/Enterprise Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        {message && (
          <p className="mt-2 text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
