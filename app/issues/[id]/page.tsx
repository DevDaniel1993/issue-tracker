import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";

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
      <p>{selectedIssue.title}</p>
      <p>{selectedIssue.description}</p>
      <p>{selectedIssue.status}</p>
      <p>{selectedIssue.updatedAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
