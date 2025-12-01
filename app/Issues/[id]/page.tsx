import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
      <Heading>{issue.title}</Heading>
      
      <Flex className="space-x-3" my='2'> 
        <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>

      </Flex>
      <Card className="prose " mt='4'>
     <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
     
    </>
  );
};

export default IssueDetailPage;
