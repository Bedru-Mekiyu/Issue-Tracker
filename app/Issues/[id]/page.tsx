import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";

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
    <Grid columns={{initial:'1',md:'2'}} gap='5  '>
      <Box>
      <IssueDetails issue={issue}/>
      </Box>
      <Box>
       <EditIssueButton issueId={issue.id}/>
      </Box>
     
    </Grid>
  );
};

export default IssueDetailPage;
