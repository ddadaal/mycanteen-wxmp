import { DishSearchResult } from "@/api/api";
import { CanteenTexts } from "@/models/dish";
import { View, Image, Text } from "@remax/wechat";
import React from "react";
import styles from "./index.css";
import { Rate } from "annar";

interface Props {
  dish: DishSearchResult;
  onClick?: () => void;
}

export const DishItem: React.FC<Props> = ({ dish, children, onClick }) => {
  return (
    <View className={styles.container} onClick={onClick}>
      <View className={styles.picture}>
        <Image
          className={styles.image}
          mode="widthFix"
          src={dish.pictureUrl}
        />
      </View>
      <View className={styles.info1}>
        <Text className={styles.title}>
          {dish.name}
        </Text>
        <Text className={styles.canteen}>
          {CanteenTexts[dish.canteen]}
        </Text>
        <View className={styles.rate}>
          <Rate
            value={dish.rate}
            readOnly
          />
        </View>
        <Text className={styles.calorie}>
          约 {dish.calorie} kCal/100g
        </Text>
      </View>
      <View className={styles.info2}>
        <Text className={styles.price}>
          {(dish.price / 100).toFixed(2)} 元/份
        </Text>
        <Text className={styles.placeholder}>
        </Text>
        <Text className={styles.rate}>
          {dish.rateNumber}人评分
        </Text>
        <Text className={styles.detail}>
          {children}
        </Text>
      </View>
    </View>
  );
};
