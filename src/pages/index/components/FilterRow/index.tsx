import { View } from "@remax/wechat";
import React from "react";
import { FilterItem } from "./FilterItem";
import styles from "./index.css";

export const FilterRow: React.FC = () => {
  return (
    <View className={styles.container}>
      <FilterItem text="食堂">
      </FilterItem>
      <FilterItem text="筛选">
        筛选
      </FilterItem>
    </View>
  );
};
