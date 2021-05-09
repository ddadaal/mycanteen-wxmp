import { DishSearchResult } from "@/api/api";
import { CanteenTexts, FlavorTexts } from "@/models/dish";
import { View, Image, Text } from "@remax/wechat";
import React from "react";
import styles from "./index.css";

interface Props {
  dish: DishSearchResult;
}

const Row: React.FC<{ iconLink: string }> = ({ iconLink, children }) =>
  <View className={styles.row}>
    <Image className={styles.icon} src={`/images/detail/${iconLink}.png`} />
    <Text className={styles.text}>
      {children}
    </Text>
  </View>;

export const DishDetailBlock: React.FC<Props> = ({ dish }) => {
  return (
    <View >
      <Row iconLink="location">
        {CanteenTexts[dish.canteen]}
      </Row>
      <Row iconLink="price">
        {dish.price} 元
      </Row>
      <Row iconLink="calorie">
        约 {dish.calorie} kCal/100g
      </Row>
      <Row iconLink="flavor">
        口味偏{FlavorTexts[dish.flavor]}
      </Row>
      <Row iconLink="time">
        平均等餐时间 {Math.ceil(dish.avgWaitTime)} 分钟
      </Row>
    </View>
  );
};
