import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, role } = await req.json();

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        role: role.toUpperCase(),
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
