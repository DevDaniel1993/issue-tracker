import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  selectedIssueId: number;
}

const EditIssueButton = ({ selectedIssueId }: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${selectedIssueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
