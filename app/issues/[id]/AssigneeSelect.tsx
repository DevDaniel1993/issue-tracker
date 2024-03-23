"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleAssignChange = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || null}
        onValueChange={handleAssignChange}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign Issue to ...</Select.Label>
            <Select.Item value={null}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
  });

export default AssigneeSelect;
