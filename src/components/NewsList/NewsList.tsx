"use client";
import React from "react";
import Link from "next/link";
import { Article } from "@/types/article.types";

import styles from "./NewsList.module.scss";
import NewsCard from "../NewsCard/NewsCard";

interface Props {
  articles: Article[];
  totalResults: number;
  page: number;
  q: string;
  category: string;
}

export default function NewsList({ articles, totalResults, page, q, category }: Props) {
  const totalPages = Math.ceil(totalResults / 10);
  const params = [
    `page=${page}`,
    q && `q=${encodeURIComponent(q)}`,
    category && `category=${category}`
  ].filter(Boolean).join("&");

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
      </div>
      <div className={styles.grid}>
        {articles.map(a => <NewsCard key={a.url} article={a} />)}
      </div>
      <div className={styles.pagination}>
        {page > 1 && (
          <Link href={`/?${params.replace(`page=${page}`, `page=${page-1}`)}`}>
            ← Назад
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/?${params.replace(`page=${page}`, `page=${page+1}`)}`}>
            Далее →
          </Link>
        )}
      </div>
    </div>
  );
}
