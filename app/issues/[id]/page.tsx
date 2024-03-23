import authOption from "@/app/auth/authOptions";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import StatusSelect from "./StatusSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOption);

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
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={selectedIssue} />
            <StatusSelect selectedIssue={selectedIssue} />
            <EditIssueButton selectedIssueId={selectedIssue.id} />
            <DeleteIssueButton selectedIssueId={selectedIssue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
