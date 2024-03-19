"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status | "ALL_ISSUES" }[] = [
  { label: "All Issues", value: "ALL_ISSUES" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL_ISSUES"}
      onValueChange={(selectedStatus: Status) => {
        const params = new URLSearchParams();
        if (selectedStatus) params.append("status", selectedStatus);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/issues/list/${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter By Status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL_ISSUES"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
