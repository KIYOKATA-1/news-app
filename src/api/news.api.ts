import { api } from "./api";
import { Article } from "@/types/article.types";

export async function fetchTopHeadlines(
  page: number,
  q?: string,
  category?: string
): Promise<{ articles: Article[]; totalResults: number }> {
  const resp = await api.get("/top-headlines", {
    params: {
      apiKey: process.env.NEWS_API_KEY,
      country: "us",
      pageSize: 10,
      page,
      ...(q ? { q } : {}),
      ...(category ? { category } : {}),
    },
  });
  return resp.data;
}

export async function fetchSingleArticle(title: string): Promise<Article | null> {
  const resp = await api.get("/everything", {
    params: {
      apiKey: process.env.NEWS_API_KEY,
      qInTitle: title,
      pageSize: 1,
    },
  });
  return resp.data.articles[0] || null;
}
