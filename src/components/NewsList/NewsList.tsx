"use client";
import React from "react";
import Link from "next/link";
import { Article } from "@/types/article.types";
import SearchFilter from "../SearchFilter/SearchFilter";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import NewsCard from "../NewsCard/NewsCard";
import styles from "./NewsList.module.scss";

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
        <SearchFilter defaultValue={q} />
        <CategoryFilter defaultValue={category} />
      </div>
      <div className={styles.grid}>
        {articles.map(a => <NewsCard key={a.url} article={a} />)}
      </div>
      <div className={styles.pagination}>
        {page > 1 && (
          <Link href={`/?${params.replace(`page=${page}`, `page=${page-1}`)}`}>
            ← Previous
          </Link>
        )}
        {page < totalPages && (
<<<<<<< HEAD
          <Link
            href={`/?${params.replace(`page=${page}`, `page=${page + 1}`)}`}
          >
            Вперед →
=======
          <Link href={`/?${params.replace(`page=${page}`, `page=${page+1}`)}`}>
            Next →
>>>>>>> 60772e4d54978dd4a4a303a01813cce202ce236b
          </Link>
        )}
      </div>
    </div>
  );
}
