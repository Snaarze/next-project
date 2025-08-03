"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteBtn = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const deleteIssue = async () => {
    axios.delete("/api/issues/" + issueId);
    router.push("/issues");
    router.refresh();
  };

  return (
    <Button color="red" onClick={deleteIssue}>
      Delete Issue
    </Button>
  );
};

export default DeleteBtn;
