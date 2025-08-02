import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkDown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  // this doesnt work even if we use parseInt it would totally be unusable
  //   if (typeof params.id !== "number") return notFound();
  // with the nextjs api need to be fetch

  const { id } = await params;
  const uniqueIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!uniqueIssue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{uniqueIssue?.title}</Heading>
        <Flex className="gap-3" my="2">
          <IssueStatusBadge status={uniqueIssue.status} />
          <Text>{uniqueIssue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkDown>{uniqueIssue?.description}</ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${uniqueIssue.id}/edit`}> Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default page;
