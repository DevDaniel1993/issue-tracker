import authOption from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { issueSchema } from "../../validationSchemas";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOption);
  if (!session)
    return NextResponse.json(
      { error: "You haven't logged in yet" },
      { status: 401 }
    );

  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
};
