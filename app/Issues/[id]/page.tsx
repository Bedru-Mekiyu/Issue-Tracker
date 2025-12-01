import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>; // important for Next 15/16 with Turbopack
}

const IssueDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;               // unwrap the Promise
  const id = Number(resolvedParams.id);

  if (!Number.isInteger(id)) {
    notFound();                                      // or handle invalid id
  }

  const issue = await prisma.issue.findUnique({
    where: { id },                                   // id: number, not NaN
  });

  if (!issue) {
    notFound();
  }

  return (
    <>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </>
  );
};

export default IssueDetailPage;
