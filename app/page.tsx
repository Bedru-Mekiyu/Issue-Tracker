// app/page.tsx
import { Pagination } from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;  // await the promise
  const currentPage = Number.parseInt(page, 10) || 1;

  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />
    </div>
  );
}
