import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("📨 Received email:", email);

    if (!email) {
      console.error("❌ No email provided");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data: exists, error: rpcError } = await supabase.rpc(
      "check_user_exists",
      { user_email: email }
    );

    if (rpcError) {
      return NextResponse.json(
        { error: "RPC failed: " + rpcError.message },
        { status: 500 }
      );
    }

    if (!exists) {
      console.warn("⚠️ No account found for email:", email);
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    const baseUrl = "https://gnosis-up.vercel.app";
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
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
