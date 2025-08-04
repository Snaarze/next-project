"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueFilter = () => {
  const router = useRouter();
  const status: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === "All" ? "" : `?status=${status}`;
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

export default IssueFilter;
