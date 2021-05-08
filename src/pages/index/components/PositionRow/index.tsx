import { View, Text, Button } from "@remax/wechat";
import React from "react";
import styles from "./index.css";

export const PositionRow: React.FC = () => {
  return (
    <View className={styles.container}>
      <View>
        <Text>
          北京大学
        </Text>
      </View>
      <View>
        <View className={styles.recommendation}>
          随机推荐
        </View>
      </View>
    </View>
  );
};
