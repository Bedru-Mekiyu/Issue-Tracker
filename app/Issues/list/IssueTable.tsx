// app/Issues/IssueTable.tsx
import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";
import Link from "../../components/Link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import { Issue, Status } from "@prisma/client";
import { Pagination } from "@/app/components/Pagination";

const ORDERABLE_FIELDS: (keyof Issue)[] = ["title", "status", "createdAt"];

type IssueTableProps = {
  status?: string;
  orderBy?: string;
  page: number;
};

export default async function IssueTable({
  status: rawStatus,
  orderBy: rawOrderBy,
  page,
}: IssueTableProps) {
  const pageSize = 10;

  const isValidStatus = rawStatus
    ? (Object.values(Status) as string[]).includes(rawStatus)
    : false;
  const status = isValidStatus ? (rawStatus as Status) : undefined;

  const isValidOrderBy = ORDERABLE_FIELDS.includes(rawOrderBy as keyof Issue);
  const orderBy = isValidOrderBy ? (rawOrderBy as keyof Issue) : undefined;

  const issues = await prisma.issue.findMany({
    where: status ? { status } : undefined,
    orderBy: orderBy ? { [orderBy]: "asc" } : undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: status ? { status } : undefined,
  });

  const columns = [
    { label: "Issue", value: "title" as const },
    { label: "Status", value: "status" as const, className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "createdAt" as const,
      className: "hidden md:table-cell",
    },
  ];

  return (
    <>
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
                      status: rawStatus,
                      orderBy: column.value,
                      page: page.toString(),
                    },
                  }}
                >
                  {column.value === orderBy && (
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
                <Link href={`/Issues/${issue.id}`}>{issue.title}</Link>
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

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </>
  );
}
