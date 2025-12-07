import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";
import { DeleteIssueButton } from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { AssigneeSelect } from "./AssigneeSelect";
import { Metadata } from "next";
import { cache } from "react";
import { title } from "process";

interface Props {
  params: Promise<{ id: string }>; // important for Next 15/16 with Turbopack
}

const  fetchUser=cache((issueId:number)=>prisma.issue.findUnique({where:{id:issueId}}))
const IssueDetailPage = async ({ params }: Props) => {
const session=  await getServerSession(authOptions); // ensure session is valid
  const resolvedParams = await params;               // unwrap the Promise
  const id = Number(resolvedParams.id);

  if (!Number.isInteger(id)) {
    notFound();                                      // or handle invalid id
  }

  const issue = await fetchUser(parseInt((await params).id))

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{initial:'1',md:'5'}} gap='5'>
      <Box className="md:col-span-4">
      <IssueDetails issue={issue}/>
      </Box>  {
        session &&

      <Box >
        <Flex direction='column' gap='4'>
          <AssigneeSelect issue={issue}/>
        <DeleteIssueButton IssueId={issue.id} />
       <EditIssueButton issueId={issue.id}/>
       </Flex>
      </Box>}
     
    </Grid>
  );
};
export async function generateMetadata({params}:Props) {
const issue=await   fetchUser(parseInt((await params).id))
return{
  title:issue?.title,
  description:"details of issue" + issue?.id
}
}

export default IssueDetailPage;
