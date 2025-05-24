import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { signUpSchema } from "../../../../../utils/validators";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

function rateLimit(ip: string, limit = 3, windowMs = 60 * 1000): boolean {
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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!rateLimit(ip)) {
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
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
