import { supabase } from "../../../../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/dashboard`,
      },
    });

    if (error) {
      console.error("Supabase auth error:", error);
      return NextResponse.json(
        { error: error.message || "Authentication failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Magic link sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
