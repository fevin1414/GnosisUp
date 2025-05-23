import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, role, orgName } = await req.json();

    let organization = null;

    if (role === "ORGANIZATION_ADMIN" || role === "ENTERPRISE_ADMIN") {
      const inferredType =
        role === "ORGANIZATION_ADMIN" ? "ORGANIZATION" : "ENTERPRISE";
      const inferredSize = role === "ORGANIZATION_ADMIN" ? 50 : 10000;

      organization = await prisma.organization.create({
        data: {
          name: orgName,
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
      console.error("❌ Supabase Auth error:", authError.message);
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
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
