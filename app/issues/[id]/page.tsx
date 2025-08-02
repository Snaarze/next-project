import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Button, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

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
    <div>
      <Heading>{uniqueIssue?.title}</Heading>
      <Flex className="gap-3" my="2">
        <IssueStatusBadge status={uniqueIssue.status} />
        <Text>{uniqueIssue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{uniqueIssue?.description}</p>
      </Card>
    </div>
  );
};

export default page;
