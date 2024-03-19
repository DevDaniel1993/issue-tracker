import { Pagination } from "./components";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page } }: Props) {
  return (
    <Pagination currentPage={parseInt(page)} itemCount={100} pageSize={10} />
  );
}
