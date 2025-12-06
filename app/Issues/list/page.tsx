import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Issue, Prisma, Status } from "@prisma/client";
import NextLink from "next/link";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";
import { Pagination } from "@/app/components/Pagination";
import { it } from "node:test";

type Props = {
  searchParams?: Promise<{
    status?: string;
    orderyBy?: string; 
    page: string;
    // comes from URL, treat as string first
  }>;
};

const ORDERABLE_FIELDS: (keyof Issue)[] = ["title", "status", "createdAt"];

async function IssuePage({ searchParams }: Props) {
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

  const rawOrderBy = resolved.orderyBy; // string from URL, e.g. "statusjk"
  const isValidOrderBy = ORDERABLE_FIELDS.includes(rawOrderBy as keyof Issue);
  const orderBy = isValidOrderBy ? (rawOrderBy as keyof Issue) : undefined;
    const page = parseInt(resolved.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
  const issues = await prisma.issue.findMany({
    where: status ? { status } : undefined,
    orderBy: orderBy ? { [orderBy]: "asc" } : undefined,
    skip:(page - 1) * pageSize,
    take: pageSize, 
  });
 const issueCount=await prisma.issue.count({
    where: { status },
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
                      ...resolved,
                      orderyBy: column.value,
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
      <Pagination pageSize={pageSize}
      currentPage={page}
      itemCount={issueCount}
      
      />
    </>
  );
}

export const dynamic = "force-dynamic";
export default IssuePage;
