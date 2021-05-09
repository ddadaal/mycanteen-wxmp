import { View, Text } from "@remax/wechat";
import { Button, Icon, Space } from "annar";
import React from "react";
import styles from "./index.css";

interface Props {
  randomEnabled: boolean;
  onRandomClicked: () => void;
}

export const PositionRow: React.FC<Props> = ({ onRandomClicked, randomEnabled }) => {
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
          onTap={onRandomClicked}
          disabled={!randomEnabled}
        >
          <Text>
            Surprise Me
          </Text>
        </Button>
      </View>
    </View>
  );
};
