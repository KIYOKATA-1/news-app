"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { CiImageOff } from "react-icons/ci";
import { Article } from "@/types/article.types";
import styles from "./NewsCard.module.scss";

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  const slug = encodeURIComponent(article.title);
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles.card}>
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
          <Link href={`/article/${slug}`} className={styles.button}>
            Читать больше
          </Link>
        </div>
      </div>
    </div>
  );
}
