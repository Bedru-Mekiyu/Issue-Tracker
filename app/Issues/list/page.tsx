// app/Issues/list/page.tsx
import { Pagination } from "@/app/components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";
import { Metadata } from "next";

type Props = {
  searchParams?: Promise<{
    status?: string;
    orderBy?: string;
    page?: string;
  }>;
};

async function IssuePage({ searchParams }: Props) {
  const resolved = (await searchParams) ?? {};

  const page = Number.parseInt(resolved.page || "1", 10) || 1;

  return (
    <>
      <IssueActions />
      <IssueTable
        status={resolved.status}
        orderBy={resolved.orderBy}
        page={page}
      />
    
    </>
  );
}

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Issues",
  description: "Browse, filter, and paginate all issues.",
};
export default IssuePage;
