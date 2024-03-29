import { Flex, Grid } from "@radix-ui/themes";
import prisma from "../../prisma/client";
import IssueCharts from "./IssueCharts";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

const Home = async () => {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5" align="center">
          <IssueSummery
            open={openIssues}
            inProgress={inProgressIssues}
            closed={closedIssues}
          />
          <IssueCharts
            openIssues={openIssues}
            inProgressIssues={inProgressIssues}
            closedIssues={closedIssues}
          />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "A project for creating, getting, showing, updating and deletting issues",
};

export default Home;
