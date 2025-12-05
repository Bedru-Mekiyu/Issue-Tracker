import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import { prisma } from "@/lib/prisma";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type ParamsPromise = Promise<{ id: string }>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: ParamsPromise }
) {
    const session =await getServerSession(authOptions);
   if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  // 1) unwrap params (Next.js 16: params is a Promise)
  const { id } = await params;
  const issueId = parseInt(id, 10);

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);


  if (!validation.success) {
    return NextResponse.json(validation.error.message, { status: 400 });


  }
    const { assignedToUserId ,title,description}=body;
   if(assignedToUserId){
    const user = await prisma?.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid assignedToUserId" },  { status: 404 }
      );
    }
   }

  // 2) now issueId is a real number, Prisma gets a valid id
  const issue = await prisma?.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  // build update payload conditionally; use relation connect for the user
  const updateData: any = {
    title,
    description,
    assignedToUserId
  };

  if (assignedToUserId) {
    updateData.assignedToUser = {
      connect: { id: assignedToUserId },
    };
  }

  const updatedIssue = await prisma?.issue.update({
    where: { id: issue.id },
    data: updateData,
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: ParamsPromise }
) {
  const session =await getServerSession(authOptions);
   if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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