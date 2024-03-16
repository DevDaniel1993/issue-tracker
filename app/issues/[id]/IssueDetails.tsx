import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  selectedIssue: Issue;
}

const IssueDetails = ({ selectedIssue }: Props) => {
  return (
    <>
      <Heading>{selectedIssue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={selectedIssue.status} />
        <Text>{selectedIssue.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="3">
        <ReactMarkdown>{selectedIssue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
