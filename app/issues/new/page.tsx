import dynamic from "next/dynamic";
import IssueFormLoadingSkeleton from "../_components/IssueFormLoadingSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
