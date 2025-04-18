import Image from "next/image";
import { Article } from "@/types/article.types";
import { api } from "@/api/api";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const title = decodeURIComponent(params.slug);
  const { data } = await api.get<{ articles: Article[] }>(
    "/everything",
    { params: { qInTitle: title, pageSize: 1 } }
  );
  const article = data.articles[0];

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
      <p>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Читать оригинал
      </a>
    </main>
  );
}
