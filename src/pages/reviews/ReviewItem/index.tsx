import { Review } from "@/api/api";
import { Categories, CategoryTexts, FlavorTexts } from "@/models/dish";
import { ImageUpload, Rate } from "annar";
import React, { useCallback, useState } from "react";
import { View, Image } from "remax/wechat";
import styles from "./index.css";

interface Props {
  review: Review;
}

function formatDateTime(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export const ReviewItem: React.FC<Props> = ({ review }) => {

  const miscString = [
    review.category ? CategoryTexts[review.category] : undefined,
    review.flavor ? FlavorTexts[review.flavor] : undefined,
    review.price ? `${(review.price / 100).toFixed(2)}元` : undefined,
  ].filter((x) => x).join(" | ");

  return (
    <View className={styles.container}>
      <View className={styles.picture}>
        <Image
          className={styles.image}
          mode="widthFix"
          src="/images/avatar.png"
        />
      </View>
      <View className={styles.info}>
        <View className={styles.title}>
          <View className={styles.text}>
            {review.userId}
          </View>
          <View className={styles.date}>
            {formatDateTime(review.time)}
          </View>
        </View>
        <View className={styles.description}>
          {review.description}
        </View>
        {
          review.pictureUrls.length > 0
            ? (
              <View className={styles.pictures}>
                <ImageUpload
                  disabled
                  deletable={false}
                  files={review.pictureUrls.map((x, i) => ({ key: i+"", url: x }))}
                />
              </View>
            ) : undefined
        }
        <View className={styles.rate}>
          <Rate
            value={review.rate}
            readOnly
          />
        </View>
        {
          miscString
            ? (
              <View className={styles.misc}>
                {miscString}
              </View>
            ) : undefined
        }
      </View>
    </View>
  );
};
