import { api } from "@/api/api";
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
    const resp = await api.get<{
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
    articles = resp.data.articles;
    totalResults = resp.data.totalResults;
  } catch (e) {
    console.error("Не удалось загрузить новости:", e);
    error = true;
  }

  if (error) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Новости недоступны</h1>
        <p>
          Не удалось подключиться к серверу новостей. Проверьте, пожалуйста, своё
          интернет‑соединение или DNS.{" "}
        </p>
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
