import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { View } from "@remax/wechat";
import styles from "./index.css";
import { CategoryButton } from "./components/CategoryButton";
import { FilterRow } from "./components/FilterRow";
import { PositionRow } from "./components/PositionRow";
import { apis } from "@/api/api";
import { DishItem } from "./components/DishItem";
import { Col, Row, SearchBar } from "annar";

const categories = [
  { image: "/images/categories/breakfast.png", text: "早餐" },
  { image: "/images/categories/meal.png", text: "正餐" },
  { image: "/images/categories/snack.png", text: "小吃" },
  { image: "/images/categories/drinking.png", text: "饮品" },
  { image: "/images/categories/dessert.png", text: "甜点" },
  { image: "/images/categories/fruit.png", text: "水果" },
];

export default () => {
  return (
    <MainLayout>
      <View className={styles.content}>
        <View className={styles.filters}>
          <SearchBar placeholder="今天想吃点什么"/>
          <PositionRow />
          <Row>
            {
              categories.map((c) => (
                <Col span={4} key={c.text}>
                  <CategoryButton
                    imageLink={c.image}
                    text={c.text}
                  />
                </Col>
              ))
            }
          </Row>
          <FilterRow />
        </View>
        <View className={styles["dishes-list"]}>
          {apis.searchDishes().results.map((x) => (
            <DishItem dish={x} key={x.calorie} />
          ))}
          {apis.searchDishes().results.map((x) => (
            <DishItem dish={x} key={x.calorie} />
          ))}
        </View>
      </View>
    </MainLayout>
  );
};
