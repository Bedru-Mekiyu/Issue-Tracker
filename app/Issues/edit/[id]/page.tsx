import React from "react";
import IssueForms from "../../_components/IssueForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditIssuePage = async ({ params }: PageProps) => {
  const { id } = await params;              // unwrap params
  const issueId = parseInt(id, 10);         // convert to number for Prisma Int

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return <IssueForms issue={issue} />;
};

export const metadata: Metadata = {
  title: "Edit Issue",
  description: "Edit existing issue details and assignee.",
};
export default EditIssuePage;
