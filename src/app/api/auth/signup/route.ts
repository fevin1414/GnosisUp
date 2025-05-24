import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { signUpSchema } from "../../../../../utils/validators";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  prefix: "signup",
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();

    const parseResult = signUpSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map(
        (issue) => issue.message
      );
      return NextResponse.json(
        { error: errorMessages.join(", ") },
        { status: 400 }
      );
    }

    const { first_name, last_name, email, role, orgName } = parseResult.data;

    let organization = null;

    if (role === "ORGANIZATION_ADMIN" || role === "ENTERPRISE_ADMIN") {
      const inferredType =
        role === "ORGANIZATION_ADMIN" ? "ORGANIZATION" : "ENTERPRISE";
      const inferredSize = role === "ORGANIZATION_ADMIN" ? 50 : 10000;

      organization = await prisma.organization.create({
        data: {
          name: orgName!,
          type: inferredType,
          size: inferredSize,
        },
      });
    }

    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json(
        { error: "Failed to create Auth user" },
        { status: 500 }
      );
    }

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        role,
        authUserId: authUser.user.id,
        organization: organization
          ? { connect: { id: organization.id } }
          : undefined,
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
