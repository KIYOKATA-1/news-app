"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useContext } from "react";
import { CiImageOff } from "react-icons/ci";
import { Article } from "@/types/article.types";
import styles from "./NewsCard.module.scss";
import gsap from "gsap";
import { FavoritesContext } from "@/context/FavoritesContext";

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const slug = encodeURIComponent(article.title);
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((a) => a.url === article.url);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.poster}>
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.noImage}>
            <CiImageOff />
          </div>
        )}
        <div className={styles.overlay} />
        <div className={styles.info}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.date}>{formattedDate}</p>
          <div className={styles.actions}>
            <Link href={`/article/${slug}`} className={styles.button}>
              Читать больше
            </Link>
            {isFavorite ? (
              <button
                className={styles.remove}
                onClick={() => toggleFavorite(article)}
              >
                Убрать из избранного
              </button>
            ) : (
              <button
                className={styles.favorite}
                onClick={() => toggleFavorite(article)}
              >
                В избранное
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
