"use client";
import dynamic from "next/dynamic";
import IssueLoadingSkeleton from "./IssueLoadingSkeleton";

const IssueFormClient = dynamic(() => import("../_components/issueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

export default IssueFormClient;
