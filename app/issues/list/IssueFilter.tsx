"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const IssueFilterComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? "?" + params.toString() : "";
        // this will change the url to /issues/list?status=OPEN
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {status.map((item) => (
          <Select.Item
            key={item.label}
            value={item.status ? item.status : "All"}
          >
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const IssueFilter = () => {
  return (
    <Suspense>
      <IssueFilterComponent />
    </Suspense>
  );
};

export default IssueFilter;

// video 71
