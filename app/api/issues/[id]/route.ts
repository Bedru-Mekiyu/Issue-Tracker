import { IssueSchema } from "@/app/validationSchema";
import { prisma } from "@/lib/prisma";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";

type ParamsPromise = Promise<{ id: string }>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: ParamsPromise }
) {
  // 1) unwrap params (Next.js 16: params is a Promise)
  const { id } = await params;
  const issueId = parseInt(id, 10);

  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.message, { status: 400 });
  }

  // 2) now issueId is a real number, Prisma gets a valid id
  const issue = await prisma?.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  const updatedIssue = await prisma?.issue.update({
    where: { id: issue.id },
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: ParamsPromise }
) {


    // 1) unwrap params (Next.js 16: params is a Promise)
  const { id } = await params;
  const issueId = parseInt(id, 10);
   const issue = await prisma?.issue.findUnique({
    where: { id: issueId },
  });  

  if(!issue)
    return NextResponse.json({error:'Invalid issue'},{status:404})
          

   await prisma.issue.delete({
    where:{id:issueId}
  })
return NextResponse.json({})
}