import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import RadixLink from "../../components/Link";
import NewIssueBtn from "./NewIssueBtn";
import { Issue, Status } from "@/app/generated/prisma";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

type SearchParams = Promise<{ status: Status; orderBy: keyof Issue }>;

interface Props {
  searchParams: SearchParams;
}

const IssuesPage = async (props: Props) => {
  const searchParams = await props.searchParams;

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // directly get the data from the database without need to use the useState hooks, and interface
  // which is kinda weird as this course is focusing in typescript and nextjs
  // although it makes sense using in this scenario and it makes the website fast by rendering it via server
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

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
  const columns: {
    label: string;
    value: keyof Issue;
    classname?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", classname: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", classname: "hidden md:table-cell" },
  ];

  return (
    <div>
      <NewIssueBtn />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.classname}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.value}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <RadixLink
                  href={`/issues/${issue.id}`}
                  children={issue.title}
                />
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
