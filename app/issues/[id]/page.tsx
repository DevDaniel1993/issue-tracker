import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBagde from "@/app/components/IssueStatusBagde";
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
    <div>
      <Heading>{selectedIssue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBagde status={selectedIssue.status} />
        <Text>{selectedIssue.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="3">
        <ReactMarkdown>{selectedIssue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
