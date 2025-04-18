"use client";

import Image from "next/image";
import React from "react";
import { api } from "@/api/api";
import { Article } from "@/types/article.types";
import styles from "./ArticlePage.module.scss";

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
      <main className={styles.container}>
        <h1 className={styles.title}>Статья недоступна</h1>
        <p className={styles.meta}>Не удалось получить данные статьи. Попробуйте позже.</p>
      </main>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.meta}>
        {article.author ?? "Unknown"} — {formattedDate}
      </p>

      {article.urlToImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <article className={styles.content}>
        <p>{article.content ?? article.description}</p>
      </article>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.readOriginal}
      >
        Читать оригинал →
      </a>
    </main>
  );
}
