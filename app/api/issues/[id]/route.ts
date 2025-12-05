import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type ParamsPromise = Promise<{ id: string }>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: ParamsPromise }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Next.js 16: params is a Promise
  const { id } = await params;
  const issueId = parseInt(id, 10);

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }

  const { assignedToUserId, title, description } = validation.data;

  // If an assignee is provided (not null/undefined), verify user exists
  if (typeof assignedToUserId !== "undefined" && assignedToUserId !== null) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid assignedToUserId" },
        { status: 404 }
      );
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  // Build update data only from provided fields
  const updateData: any = {};

  if (typeof title !== "undefined") updateData.title = title;
  if (typeof description !== "undefined") updateData.description = description;

  // Handle assignment/unassignment via FK field
  if (typeof assignedToUserId !== "undefined") {
    // when null => unassign; when string => assign
    updateData.assignedToUserId = assignedToUserId;
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: updateData,
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: ParamsPromise }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const issueId = parseInt(id, 10);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({});
}
