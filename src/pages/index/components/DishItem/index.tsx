import { DishSearchResult } from "@/api/api";
import { CanteenTexts } from "@/models/dish";
import { View, Image, Text } from "@remax/wechat";
import React from "react";
import styles from "./index.css";
import { Rate } from "annar";

interface Props {
  dish: DishSearchResult;
}

export const DishItem: React.FC<Props> = ({ dish }) => {
  return (
    <View className={styles.container}>
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
          {dish.price} 元/份
        </Text>
        <Text className={styles.placeholder}>
        </Text>
        <Text className={styles.rate}>
          {dish.rateNumber}人评分
        </Text>
        <Text className={styles.detail}>
          查看详情
        </Text>
      </View>
    </View>
  );
};
