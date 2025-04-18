import { api } from "@/api/api";
import NewsList from "@/components/NewsList/NewsList";
import { Article } from "@/types/article.types";


export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string; category?: string; page?: string };
}

export default async function Home({ searchParams }: Props) {
  const page     = parseInt(searchParams.page || "1", 10);
  const q        = searchParams.q || "";
  const category = searchParams.category || "";

  const { data } = await api.get<{ articles: Article[]; totalResults: number }>(
    "/top-headlines",
    {
      params: {
        country: "us",
        pageSize: 10,
        page,
        ...(q ? { q } : {}),
        ...(category ? { category } : {}),
      },
    }
  );

  return (
    <NewsList
      articles={data.articles}
      totalResults={data.totalResults}
      page={page}
      q={q}
      category={category}
    />
  );
}
