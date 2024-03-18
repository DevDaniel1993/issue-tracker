import authOption from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

interface Props {
  params: { id: string };
}

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  // const session = await getServerSession(authOption);
  // if (!session)
  //   return NextResponse.json(
  //     { error: "You haven't logged in yet" },
  //     { status: 401 }
  //   );

  const body = await request.json();
  const { title, description, assignedToUserId } = body;

  const validation = patchIssueSchema.safeParse(body);

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const session = await getServerSession(authOption);
  if (!session)
    return NextResponse.json(
      { error: "You haven't logged in yet" },
      { status: 401 }
    );

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });

  await prisma.issue.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({});
};
