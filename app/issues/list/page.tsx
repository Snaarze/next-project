import { prisma } from "@/prisma/client";
import NewIssueBtn from "./NewIssueBtn";
import { Issue, Status } from "@/app/generated/prisma";
import Pagination from "@/app/components/Pagination";
import IssueTable from "./IssueTable";
import { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export type SearchParams = Promise<{
  page: string;
  status: Status;
  orderBy: keyof Issue;
}>;

interface Props {
  searchParams: SearchParams;
}

const IssuesPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // directly get the data from the database without need to use the useState hooks, and interface
  // which is kinda weird as this course is focusing in typescript and nextjs
  // although it makes sense using in this scenario and it makes the website fast by rendering it via server
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    // number of records we should skip
    skip: (page - 1) * pageSize,
    // number of records that we want to fetch
    take: pageSize,
  });
  // this query will fetch all the available records in length
  const issueCount = await prisma.issue.count({ where: { status } });

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
    <Flex direction="column" gap="3">
      <NewIssueBtn />
      <IssueTable searchParams={props.searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View All Project List",
};

export default IssuesPage;
