import { Pagination } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import prisma from "../../../../prisma/client";
import ActionToolbar from "./ActionToolbar";
import IssueTable, { columnName } from "./IssueTable";

interface Props {
  searchParams: { page: string; status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({
  searchParams: {
    status: selectedStatus,
    orderBy: selectedOrder,
    page: pageNumber,
  },
}: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(selectedStatus) ? selectedStatus : undefined;
  const where = { status };

  const orderBy = columnName.includes(selectedOrder)
    ? { [selectedOrder]: "asc" }
    : undefined;

  const page: number = parseInt(pageNumber) || 1;
  const pageSize: number = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <ActionToolbar />

      <IssueTable
        issues={issues}
        searchParams={{
          status: selectedStatus,
          orderBy: selectedOrder,
          page: pageNumber,
        }}
      />

      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export default IssuesPage;
