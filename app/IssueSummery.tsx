import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummery = async ({ closed, inProgress, open }: Props) => {
  const containers: { label: string; issueCount: number; status: Status }[] = [
    { label: "Open Issues", issueCount: open, status: "OPEN" },
    {
      label: "In-Progress Issues",
      issueCount: inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", issueCount: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Link
          className="text-sm font-medium"
          href={`/issues/list?status=${container.status}`}
        >
          <Card
            className="hover:shadow-md hover:transition-all"
            key={container.label}
          >
            <Flex direction="column">
              {container.label}
              <Text size="5" className="font-bold">
                {container.issueCount}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummery;
