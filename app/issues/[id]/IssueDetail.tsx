import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@/app/generated/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

// interface Issue {
//   title: string;
//   description: string;
//   status: Status;
//   createdAt: Date;
// }

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetail;
