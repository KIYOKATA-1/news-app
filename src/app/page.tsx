import { fetchTopHeadlines } from "@/api/news.api";
import NewsList from "@/components/NewsList/NewsList";
import { Article } from "@/types/article.types";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const { q = "", category = "", page: pageRaw = "1" } = await searchParams;
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
