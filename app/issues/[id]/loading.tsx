import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const IssueDetailLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
        <Skeleton />
      </Flex>
      <Card className="prose" mt="3">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default IssueDetailLoadingPage;
