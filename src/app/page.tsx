// src/app/page.tsx

import { api } from "@/api/api";
import NewsList from "@/components/NewsList/NewsList";
import { Article } from "@/types/article.types";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const {
    q = "",
    category = "",
    page: pageRaw = "1",
  } = await searchParams;

  const page = parseInt(pageRaw, 10);

  const { data } = await api.get<{
    articles: Article[];
    totalResults: number;
  }>("/top-headlines", {
    params: {
      country: "us",
      pageSize: 10,
      page,
      ...(q ? { q } : {}),
      ...(category ? { category } : {}),
    },
  });

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
