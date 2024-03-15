import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoadingPage = () => {
  return (
    <>
      <Box className="max-w-xl mb-5">
        <Skeleton />
        <Skeleton height="20rem" />
      </Box>

      <Skeleton width="8rem" />
    </>
  );
};

export default NewIssueLoadingPage;
