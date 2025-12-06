import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";

export default async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true }, // spelling must match schema
  });

  return (
    <Card>
      <Heading size="3" mb="4">
        Latest Issues
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center" gap="3">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/Issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>

                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image ?? undefined}
                      fallback=""
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
