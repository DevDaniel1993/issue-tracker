import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  selectedIssueId: number;
}

const DeleteIssueButton = ({ selectedIssueId }: Props) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
