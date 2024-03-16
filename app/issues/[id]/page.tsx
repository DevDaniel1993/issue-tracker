import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!selectedIssue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
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
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${selectedIssue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
