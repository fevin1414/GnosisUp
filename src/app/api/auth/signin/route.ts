import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateRequest, signInSchema } from "../../../../../utils/validators";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || now - entry.timestamp > windowMs) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email } = validateRequest(signInSchema, body);

    const { data: exists, error: rpcError } = await supabase.rpc(
      "check_user_exists",
      { user_email: email }
    );

    if (rpcError) {
      return NextResponse.json(
        { error: "Internal server error" },
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

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/dashboard`,
        shouldCreateUser: false,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send magic link" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Magic link sent successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
