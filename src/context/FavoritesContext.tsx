"use client";
import { Article } from "@/types/article.types";
import React, { createContext, useState, useEffect } from "react";

interface Context {
  favorites: Article[];
  toggleFavorite: (a: Article) => void;
}
export const FavoritesContext = createContext<Context>({
  favorites: [],
  toggleFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (article: Article) => {
    setFavorites((prev) =>
      prev.some((a) => a.url === article.url)
        ? prev.filter((a) => a.url !== article.url)
        : [...prev, article]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
