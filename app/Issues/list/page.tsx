import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";

type Props = {
  searchParams?: Promise<{
    status?: string;
    orderyBy?: keyof Issue;
  }>;
};

async function IssuePage({ searchParams }: Props) {
  // Always unwrap once at the top
  const resolved = (await searchParams) ?? {};

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const rawStatus = resolved.status;
  console.log("rawStatus:", rawStatus);

  const isValidStatus = rawStatus
    ? (Object.values(Status) as string[]).includes(rawStatus)
    : false;

  const status = isValidStatus ? (rawStatus as Status) : undefined;
  const orderyBy = resolved.orderyBy; // use this later

  const issues = await prisma.issue.findMany({
    where: status ? { status } : undefined,
    orderBy: orderyBy ? { [orderyBy]: "asc" } : undefined,
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    pathname: "/Issues/list",
                    query: {
                      // use the resolved plain object
                      ...resolved,
                      orderyBy: column.value,
                    },
                  }}
                >
                  {/* compare to `orderyBy` (resolved), not `searchParams` */}
                  {column.value === orderyBy && (
                    <ThickArrowUpIcon className="inline" />
                  )}
                  {column.label}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/Issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export const dynamic = "force-dynamic";
export default IssuePage;
