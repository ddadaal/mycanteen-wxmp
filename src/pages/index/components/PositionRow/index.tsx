import { View, Text } from "@remax/wechat";
import { Button, Icon, Space } from "annar";
import React from "react";
import styles from "./index.css";

export const PositionRow: React.FC = () => {
  return (
    <View className={styles.container}>
      <View className={styles.position}>
        <Icon type="location" size={32} />
        <Text>
          &nbsp;北京大学
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
