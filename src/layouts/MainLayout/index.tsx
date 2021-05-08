import React from "react";
import { View } from "@remax/wechat";
import TabBar from "weui-miniprogram/miniprogram_dist/tabbar/tabbar";
import styles from "./index.css";

const barList = [{
  "text": "主页",
  "iconPath": "/images/tabbar/home.png",
  "selectedIconPath": "/images/tabbar/home.png",
},{
  "text": "发布",
  "iconPath": "/images/tabbar/upload.png",
  "selectedIconPath": "/images/tabbar/upload.png",
}, {
  "text": "个人信息",
  "iconPath": "/images/tabbar/profile.png",
  "selectedIconPath": "/images/tabbar/profile.png",
}];

export const MainLayout: React.FC = ({ children }) => {
  return (
    <View className={styles.container}>
      <View className={styles.content}>
        {children}
      </View>
      <View className={styles.tabbar}>
        <TabBar list={barList} />
      </View>
    </View>
  );
};
