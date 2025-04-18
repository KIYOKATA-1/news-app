"use client";

import React from "react";
import styles from "../NewsCard/NewsCard.module.scss";
import skeletonStyles from "./NewsCardSkeleton.module.scss";

export default function NewsCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={skeletonStyles.skeletonPoster} />
      <div className={skeletonStyles.skeletonInfo}>
        <div className={skeletonStyles.skeletonTitle} />
        <div className={skeletonStyles.skeletonDate} />
        <div className={skeletonStyles.skeletonButton} />
      </div>
    </div>
  );
}
