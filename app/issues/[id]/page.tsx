import { prisma } from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueBtn from "../edit/[id]/EditIssueBtn";
import IssueDetail from "./IssueDetail";
import DeleteBtn from "./delete/deleteBtn";
import { getServerSession } from "next-auth";
import { serverSession } from "@/app/api/auth/[...nextauth]/route";
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  // this doesnt work even if we use parseInt it would totally be unusable
  //   if (typeof params.id !== "number") return notFound();
  // with the nextjs api need to be fetch
  const session = await getServerSession(serverSession);
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
            <EditIssueBtn id={uniqueIssue.id} />
            <DeleteBtn issueId={uniqueIssue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export const revalidate = 0;

export default page;
