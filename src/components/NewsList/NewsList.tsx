"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import Link from "next/link";
import { Article } from "@/types/article.types";
import SearchFilter from "../SearchFilter/SearchFilter";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import NewsCard from "../NewsCard/NewsCard";
import styles from "./NewsList.module.scss";
import gsap from "gsap";
import NewsCardSkeleton from "../NewsCardSkeleton/NewsCardSkeleton";
import { FavoritesContext } from "@/context/FavoritesContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
  const [showFavorites, setShowFavorites] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(totalResults / 10);

  const { favorites } = useContext(FavoritesContext);

  const displayedArticles = showFavorites ? favorites : articles;

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

  useEffect(() => {
    if (favorites.length > 0) {
      setShowFavorites(true);
    }
  }, [favorites]);

  return (
    <div className={styles.paper} ref={containerRef}>
      <div className={styles.filters}>
        <SearchFilter defaultValue={q} />
        <CategoryFilter defaultValue={category} />
        <button
          className={styles.favoriteToggle}
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? "Все новости" : "Избранное"}
        </button>
      </div>

      <div className={styles.columns}>
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <NewsCardSkeleton key={idx} />
          ))
        ) : displayedArticles.length === 0 ? (
          <p className={styles.empty}>Пусто</p>
        ) : (
          displayedArticles.map((a) => <NewsCard key={a.url} article={a} />)
        )}
      </div>

      {!loading && !showFavorites && (
        <div className={styles.pagination}>
          {page > 1 && (
            <Link
              href={`/?${params.replace(`page=${page}`, `page=${page - 1}`)}`}
              className={styles.pageLink}
            >
              <FaAngleLeft /> Назад
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/?${params.replace(`page=${page}`, `page=${page + 1}`)}`}
              className={styles.pageLink}
            >
              Вперед <FaAngleRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
