import { prisma } from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueBtn from "./edit/EditIssueBtn";
import IssueDetail from "./IssueDetail";
import DeleteBtn from "./delete/deleteBtn";
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
        <IssueDetail issue={uniqueIssue} />
      </Box>
      <Box>
        <EditIssueBtn id={uniqueIssue.id} />
        <DeleteBtn issueId={uniqueIssue.id} />
      </Box>
    </Grid>
  );
};

export const revalidate = 0;

export default page;
