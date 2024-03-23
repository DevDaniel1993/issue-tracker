import dynamic from "next/dynamic";
import IssueFormLoadingSkeleton from "../_components/IssueFormLoadingSkeleton";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Issue Tracker - Create New Issue",
  description: "In this page, you will be able to create a new issue",
};

export default NewIssuePage;
