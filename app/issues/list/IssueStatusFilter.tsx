"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value?: Status }[] = [
  { label: "All Issues" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter By Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Select Filter</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || null}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
