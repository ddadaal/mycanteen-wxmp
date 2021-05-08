import { View } from "@remax/wechat";
import React from "react";
import styles from "./index.css";

interface Props {
  text: string;
}

export const FilterItem: React.FC<Props> = ({ text }) => {
  return (
    <View className={styles["filter-item"]}>
      {text}
    </View>
  );
};
