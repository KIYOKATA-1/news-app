import Image from "next/image";

import { Article } from "@/types/article.types";
import React from "react";
import { api } from "@/api/api";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = decodeURIComponent(slug);

  let article: Article | null = null;
  let error = false;

  try {
    const resp = await api.get<{ articles: Article[] }>("/everything", {
      params: { qInTitle: title, pageSize: 1 },
    });
    article = resp.data.articles[0] || null;
  } catch (e) {
    console.error("Не удалось загрузить статью:", e);
    error = true;
  }

  if (error || !article) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Статья недоступна</h1>
        <p>Не удалось получить данные статьи. Попробуйте позже.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>{article.title}</h1>
      <p>
        <em>
          {article.author ?? "Unknown"} —{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </em>
      </p>

      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          width={800}
          height={450}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}

      <p>{article.content ?? article.description}</p>

      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Читать оригинал
      </a>

    </main>
  );
}
