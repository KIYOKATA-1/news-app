"use client";
import React from "react";
import styles from "./SearchFilter.module.scss";

interface Props { defaultValue: string; }
export default function SearchFilter({ defaultValue }: Props) {
  return (
    <form method="get" className={styles.form}>
      <input
        name="q"
        placeholder="Поиск..."
        defaultValue={defaultValue}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>-</button>
    </form>
  );
}
