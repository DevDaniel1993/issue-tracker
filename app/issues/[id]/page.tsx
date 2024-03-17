import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import DeleteIssueButton from "./DeleteIssueButton";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails selectedIssue={selectedIssue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton selectedIssueId={selectedIssue.id} />
          <DeleteIssueButton selectedIssueId={selectedIssue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
