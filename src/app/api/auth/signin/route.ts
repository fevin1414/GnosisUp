import { supabase } from "../../../../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXTAUTH_URL}/dashboard` },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Magic link sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
