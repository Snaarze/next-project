import { issuesSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// prevent caching if we use request props
export async function GET(request: NextRequest) {
  const user = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  if (!user) NextResponse.json({ error: "User not found" }), { status: 404 };

  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = issuesSchema.safeParse(body);

  if (!validation.success)
    NextResponse.json(validation.error.issues, { status: 401 });

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(newUser);
}
