import { prisma } from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueBtn from "../edit/[id]/EditIssueBtn";
import IssueDetail from "./IssueDetail";
import DeleteBtn from "./delete/deleteBtn";
import { getServerSession } from "next-auth";

import AssigneeSelect from "./AssigneeSelect";
import AuthOption from "@/app/auth/AuthOption";
import { Issue } from "@/app/generated/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  // this doesnt work even if we use parseInt it would totally be unusable
  //   if (typeof params.id !== "number") return notFound();
  // with the nextjs api need to be fetch
  const session = await getServerSession(AuthOption);
  const { id } = await params;
  const uniqueIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!uniqueIssue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={uniqueIssue} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={uniqueIssue} />
            <EditIssueBtn id={uniqueIssue.id} />
            <DeleteBtn issueId={uniqueIssue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export const revalidate = 0;

// this dynamically change the metadata title and description

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issueTitle = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return {
    title: issueTitle?.title,
    description: "Details of issue " + issueTitle?.id,
  };
}
export default page;
