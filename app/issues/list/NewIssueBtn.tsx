import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Flex } from "@radix-ui/themes";
import IssueFilter from "./IssueFilter";
const NewIssueBtn = () => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default NewIssueBtn;
