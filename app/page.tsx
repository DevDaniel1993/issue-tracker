import prisma from "../../prisma/client";
import IssueSummery from "./IssueSummery";

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <>
      <IssueSummery
        open={openIssues}
        inProgress={inProgressIssues}
        closed={closedIssues}
      />
    </>
  );
}
