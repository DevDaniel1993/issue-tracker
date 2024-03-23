import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import prisma from "../../../../../prisma/client";
import IssueFormLoadingSkeleton from "./loading";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((userId: number) =>
  prisma.issue.findUnique({ where: { id: userId } })
);

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoadingSkeleton />,
});

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await fetchUser(parseInt(id));

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const generateMetadata = async ({ params: { id } }: Props) => {
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: "Here is a page for editing an issue",
  };
};

export default EditIssuePage;
