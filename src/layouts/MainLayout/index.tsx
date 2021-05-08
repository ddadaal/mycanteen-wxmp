import React from "react";
import { View } from "@remax/wechat";
import styles from "./index.css";

export const MainLayout: React.FC = ({ children }) => {

  return (
    <View className={styles.container}>
      <View className={styles.content}>
        {children}
      </View>
    </View>
  );
};
