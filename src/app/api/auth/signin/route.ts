import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateRequest, signInSchema } from "../../../../../utils/validators";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ Validate and sanitize email
    const { email } = validateRequest(signInSchema, body);

    // 🔍 Check if user exists using Supabase RPC
    const { data: exists, error: rpcError } = await supabase.rpc(
      "check_user_exists",
      {
        user_email: email,
      }
    );

    if (rpcError) {
      return NextResponse.json(
        { error: `RPC failed: ${rpcError.message}` },
        { status: 500 }
      );
    }

    if (!exists) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://gnosis-up.vercel.app";

    // 🚀 Send magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/dashboard`,
        shouldCreateUser: false,
      },
    });

    if (error) {
      if (error.message.includes("User not found")) {
        return NextResponse.json(
          { error: "Account not verified. Please sign up first." },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: "Failed to send magic link. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Magic link sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
