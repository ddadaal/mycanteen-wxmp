import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { View } from "@remax/wechat";
import styles from "./index.css";

export default () => {
  return (
    <MainLayout>
      <View className={styles.content}>
      </View>
    </MainLayout>
  );
};
