import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBagde from "@/app/components/IssueStatusBagde";

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
      <Card>{selectedIssue.description}</Card>
    </div>
  );
};

export default IssueDetailPage;
