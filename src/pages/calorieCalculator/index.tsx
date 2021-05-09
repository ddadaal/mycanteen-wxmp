import { DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { View, Text } from "@remax/wechat";
import { Button, Progress } from "annar";
import React, { useState } from "react";
import styles from "./index.css";

const total = 600;

export const CalorieCalculator: React.FC = () => {

  const [dishes, setDishes] = useState<DishSearchResult[]>([]);

  const calorie = dishes.reduce((prev, curr) => prev + curr.calorie, 0);

  return (
    <View className={styles.content}>
      <View className={styles.stat}>
        <View className={styles.number}>
          <Text className={styles.value}>
            {calorie}
          </Text>
          {" / "}
          <Text className={styles.total}>
            {total}
          </Text>
        </View>
        <View className={styles.progress}>
          <Progress
            percent={dishes.reduce((prev, curr) => prev+curr.calorie, 0) / total * 100}
          />
        </View>

      </View>
      <View className={styles.menu}>
        <View className={styles.title}>
          已选食物
        </View>
        <View className={styles.list}>
          {
            dishes.map((x) => (
              <DishItem dish={x} key={x.id} />
            ))
          }
        </View>
        <Button
          block
          type="primary"
        >
          添加新菜品
        </Button>
      </View>
    </View>
  );
};

export default CalorieCalculator;
