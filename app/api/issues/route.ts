import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import issuesSchema from "./schema";
import { getServerSession } from "next-auth";
import AuthOption from "@/app/auth/AuthOption";

export async function GET(request: NextRequest) {
  const issue = await prisma.issue.findMany();

  return NextResponse.json(issue);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOption);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = issuesSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error?.format(), {
      status: 401,
    });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
