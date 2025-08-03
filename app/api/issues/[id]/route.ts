import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import issuesSchema from "../schema";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const user = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const validation = issuesSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 401 });

  // my current approach is without validating the uniqueness of the object by finding it via function
  // mosh approach is check if there are valid object

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // here is my aprroach directly accessing the data via query and get the data by where clause
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue?.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}
