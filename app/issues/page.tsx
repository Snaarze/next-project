import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import NewIssueBtn from "./NewIssueBtn";

// interface Issue {
//   id: number;
//   title: string;
//   description: string;
// }

const IssuesPage = async () => {
  // directly get the data from the database without need to use the useState hooks, and interface
  // which is kinda weird as this course is focusing in typescript and nextjs
  // although it makes sense using in this scenario and it makes the website fast by rendering it via server
  const issues = await prisma.issue.findMany();
  await delay(2000);
  // doing this will need to convert the component to client side
  // const [data, setData] = useState<Issue>();
  // console.log(data);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios
  //         .get<Issue>("api/issues")
  //         .then((res) => res.data);

  //       setData(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <div>
      <NewIssueBtn />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
