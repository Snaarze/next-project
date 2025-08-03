import React from "react";
import Skeleton from "@/app/components/Skeleton";
import { Box } from "@radix-ui/themes";

const IssueLoadingSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueLoadingSkeleton;
