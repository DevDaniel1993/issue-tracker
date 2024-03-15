import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const issueMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  CLOSED: { label: "Closed", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  OPEN: { label: "Open", color: "green" },
};

interface Prop {
  status: Status;
}

const IssueStatusBadge = ({ status }: Prop) => {
  return <Badge color={issueMap[status].color}>{issueMap[status].label}</Badge>;
};

export default IssueStatusBadge;
