import { DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { getUserProfile, getUserProfileNow } from "@/utils/getUserProfile";
import { View, Text } from "@remax/wechat";
import { Button, Progress } from "annar";
import React, { useState } from "react";
import styles from "./index.css";

const calories = {
  default: 600,
  // 未知
  0: 600,
  // 男性
  1: 720,
  // 女性
  2: 520,
};

export const CalorieCalculator: React.FC = () => {

  const [dishes, setDishes] = useState<DishSearchResult[]>([]);

  const calorie = dishes.reduce((prev, curr) => prev + curr.calorie, 0);

  const [profile, setProfile] = useState(getUserProfileNow());

  const total =
    profile
      ? calories[profile.gender]
      : calories.default;

  return (
    <View className={styles.content}>
      <View className={styles.stat}>
        <View className={styles.title}>
          消耗热量 / 推荐热量
        </View>
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
            percent={calorie / total * 100}
            bgColor="#9E9E9E"
            color="#FFAE00"
          />
        </View>

        {
          profile ? undefined
            : (
              <View className={styles.authorize}>
                <Button onTap={() => {
                  getUserProfile().then((x) => setProfile(x));
                }} ghost
                color="black"
                >
                  授权以获得更精确的推荐热量
                </Button>
              </View>
            )
        }

      </View>
      <View className={styles.menu}>
        <View className={styles.title}>
          已选食物
        </View>
        <View className={styles.list}>
          {
            dishes.map((x) => (
              <DishItem dish={x} key={x.dishId}
                onClick={() => setDishes(dishes.filter((x) => x.dishId !== x.dishId))}
              >
                点击删除
              </DishItem>
            ))
          }
        </View>
        <Button
          block
          look="warning"
          type="primary"
          onTap={() => wx.navigateTo({
            url: "/pages/calorieCalculator/DishSelector",
            events: { dishSelected: (d) => setDishes([...dishes, d]) },
          }) }
        >
          添加新菜品
        </Button>
      </View>
    </View>
  );
};

export default CalorieCalculator;
