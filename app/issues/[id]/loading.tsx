import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";

const IssueDetailLoadingPage = () => {
  return (
    <Grid columns="5" gap="3">
      <Box className="col-span-4">
        <Skeleton width="28rem" />
        <Flex className="space-x-3" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose" mt="3">
          <Skeleton count={5} />
        </Card>
      </Box>
      <Flex direction="column" gap="5">
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
      </Flex>
    </Grid>
  );
};

export default IssueDetailLoadingPage;
