import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!selectedIssue) notFound();

  return (
    <Box>
      <Heading>{selectedIssue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={selectedIssue.status} />
        <Text>{selectedIssue.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="3">
        <ReactMarkdown>{selectedIssue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
