import Pagination from "./components/Pagination";

type SearchParams = Promise<{ page: string }>;

interface Props {
  searchParams: SearchParams;
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
}
