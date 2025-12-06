"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: string }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams= useSearchParams()

  return (
    <Select.Root
      defaultValue={
        searchParams.get("status") ?? ""
      }
      onValueChange={(value) => {
        const params=new URLSearchParams()
        if(value )params.append("status",value)
          if(searchParams.get("orderyBy"))params.append("orderyBy", searchParams.get("orderyBy")!)

         searchParams.get("orderyBy")
        // Treat "ALL" as "no status filter"
        const status = value === "ALL" ? undefined : (value as Status);
        const query = params.size ? `?${params.toString()}` : "" ;
        router.push("/Issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
