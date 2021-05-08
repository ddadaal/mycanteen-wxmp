import { View, Text } from "@remax/wechat";
import { Button } from "annar";
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
        <Button
          look="warning"
        >
          <Text>
            随机
          </Text>
        </Button>
      </View>
    </View>
  );
};
