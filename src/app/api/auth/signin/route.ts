import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateRequest, signInSchema } from "../../../../../utils/validators";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { Redis } from "@upstash/redis";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "signin",
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
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
