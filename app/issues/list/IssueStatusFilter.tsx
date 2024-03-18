"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All Issues" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(selectedStatus: Status) => {
        router.push(`/issues/list/?status=${selectedStatus}`);
      }}
    >
      <Select.Trigger placeholder="Filter By Status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || null}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
