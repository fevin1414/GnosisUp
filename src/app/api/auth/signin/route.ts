import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      console.log("❌ Email not provided");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("📧 Email received:", email);

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
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    const {
      data: { users },
      error: authError,
    } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.log("❌ Auth fetch error:", authError.message);
      return NextResponse.json(
        { error: "Failed to verify account" },
        { status: 500 }
      );
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "Account not verified" },
        { status: 403 }
      );
    }
    const baseUrl = "https://gnosis-up.vercel.app/";
    // 3. Send the magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/dashboard`,
        shouldCreateUser: false,
      },
    });

    if (error) {
      throw error;
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
