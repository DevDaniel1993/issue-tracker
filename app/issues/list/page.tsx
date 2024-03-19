import { IssueStatusBadge, Pagination } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "@/app/components/Link";
import prisma from "../../../../prisma/client";
import ActionToolbar from "./ActionToolbar";

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
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(selectedStatus) ? selectedStatus : undefined;
  const where = { status };

  const orderBy = columns.map((column) => column.value).includes(selectedOrder)
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
    <div>
      <ActionToolbar />

      <Table.Root variant="surface" mb="3">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { status: selectedStatus, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {selectedOrder === column.value && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default IssuesPage;
