import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
        <IssueDetails selectedIssue={selectedIssue} />
      </Box>
      <Box>
        <EditIssueButton selectedIssueId={selectedIssue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
