export const dynamic = "force-dynamic";

import { fetchTopHeadlines } from "@/api/news.api";
import NewsList from "@/components/NewsList/NewsList";
import { Article } from "@/types/article.types";

interface Props {
  searchParams: { q?: string; category?: string; page?: string };
}

export default async function Home({ searchParams }: Props) {
  const { q = "", category = "", page: pageRaw = "1" } = searchParams;
  const page = parseInt(pageRaw, 10);

  let articles: Article[] = [];
  let totalResults = 0;
  let error = false;

  try {
    const data = await fetchTopHeadlines(page, q, category);
    articles = data.articles;
    totalResults = data.totalResults;
  } catch (e) {
    console.error("Ошибка загрузки:", e);
    error = true;
  }

  if (error) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Ошибка загрузки</h1>
      </main>
    );
  }

  return (
    <NewsList
      articles={articles}
      totalResults={totalResults}
      page={page}
      q={q}
      category={category}
    />
  );
}
