"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  itemCount: number;
  pageSize: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (page: number) => {
    const param = new URLSearchParams(searchParams);
    param.set("page", page.toString());
    router.push("?" + param.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        onClick={() => changePage(1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage - 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage + 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        onClick={() => changePage(pageCount)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
