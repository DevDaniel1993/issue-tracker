import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueFormLoadingSkeleton = () => {
  return (
    <>
      <Box className="max-w-xl mb-5">
        <Skeleton height="2rem" />
        <Skeleton height="20rem" />
      </Box>

      <Skeleton width="8rem" />
    </>
  );
};

export default IssueFormLoadingSkeleton;
