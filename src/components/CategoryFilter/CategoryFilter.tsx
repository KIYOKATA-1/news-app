"use client";
import React from "react";
import styles from "./CategoryFilter.module.scss";

const categories = ["","business","entertainment","health","science","sports","technology"];
interface Props { defaultValue: string; }
export default function CategoryFilter({ defaultValue }: Props) {
  return (
    <form method="get" className={styles.form}>
      <select name="category" defaultValue={defaultValue} className={styles.select}>
        <option value="">Все категории</option>
        {categories.slice(1).map(c => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.button}>Фильтровать</button>
    </form>
  );
}
