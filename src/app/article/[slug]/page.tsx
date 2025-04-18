import { fetchSingleArticle } from "@/api/news.api";
import styles from "./ArticlePage.module.scss";
import Image from "next/image";
import { Article } from "@/types/article.types";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const title = decodeURIComponent(params.slug);

  let article: Article | null = null;
  let error = false;

  try {
    article = await fetchSingleArticle(title);
  } catch (e) {
    console.error("Ошибка статьи:", e);
    error = true;
  }

  if (error || !article) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Статья недоступна</h1>
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
