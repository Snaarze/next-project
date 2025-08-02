import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";
const LoadngIssueDetailPage = () => {
  return (
    <Box>
      <Heading>
        <Skeleton width="10rem" />
      </Heading>
      <Flex className="gap-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadngIssueDetailPage;
