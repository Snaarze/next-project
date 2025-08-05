import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormClient from "../../_components/IssueFormClient";

type Props = {
  params: Promise<{ id: string }>;
};

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();
  return <IssueFormClient issue={issue} />;
};

export default EditIssuePage;
