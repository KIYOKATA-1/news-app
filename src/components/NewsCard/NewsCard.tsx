"use client";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article.types";
import styles from "./NewsCard.module.scss";

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  const slug = encodeURIComponent(article.title);
  return (
    <Link href={`/article/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.imageWrapper}>No Image</div>
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.description}>{article.description || ""}</p>
      </div>
      <div className={styles.date}>
        {(() => {
          const d = new Date(article.publishedAt);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          return `${day}.${month}.${year}`;
        })()}
      </div>
    </Link>
  );
}
