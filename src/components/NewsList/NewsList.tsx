"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Article } from "@/types/article.types";
import SearchFilter from "../SearchFilter/SearchFilter";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import NewsCard from "../NewsCard/NewsCard";
import styles from "./NewsList.module.scss";
import gsap from "gsap";
import NewsCardSkeleton from "../NewsCardSkeleton/NewsCardSkeleton";

interface Props {
  articles: Article[];
  totalResults: number;
  page: number;
  q: string;
  category: string;
}

export default function NewsList({
  articles,
  totalResults,
  page,
  q,
  category,
}: Props) {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(totalResults / 10);

  const params = [
    `page=${page}`,
    q && `q=${encodeURIComponent(q)}`,
    category && `category=${category}`,
  ]
    .filter(Boolean)
    .join("&");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.paper} ref={containerRef}>
      <div className={styles.filters}>
        <SearchFilter defaultValue={q} />
        <CategoryFilter defaultValue={category} />
      </div>

      <div className={styles.columns}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <NewsCardSkeleton key={idx} />
            ))
          : articles.map((a) => <NewsCard key={a.url} article={a} />)}
      </div>

      {!loading && (
        <div className={styles.pagination}>
          {page > 1 && (
            <Link
              href={`/?${params.replace(`page=${page}`, `page=${page - 1}`)}`}
              className={styles.pageLink}
            >
              ← Назад
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/?${params.replace(`page=${page}`, `page=${page + 1}`)}`}
              className={styles.pageLink}
            >
              Вперед →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
