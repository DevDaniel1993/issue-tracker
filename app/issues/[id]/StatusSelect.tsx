"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  selectedIssue: Issue;
}

const StatusSelect = ({ selectedIssue }: Props) => {
  const router = useRouter();
  const statuses: { label: string; value: Status | "NONE" }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In-Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <>
      <Select.Root
        onValueChange={(seletcedStatus: string) => {
          try {
            axios.patch(`/api/issues/${selectedIssue.id}`, {
              status: seletcedStatus,
            });
            router.push("/issues/list");
            router.refresh();
          } catch (error) {
            toast.error("Changes could not be saved");
          }
        }}
        defaultValue={selectedIssue.status || "Select a status"}
      >
        <Select.Trigger placeholder="Select the status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign status to...</Select.Label>
            {statuses.map((status) => (
              <Select.Item value={status.value} key={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
