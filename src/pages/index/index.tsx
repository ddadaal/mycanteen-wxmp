import * as React from "react";
import { View, Text, Image, Button, setTabBarItem, getUserInfo } from "remax/wechat"; 
import styles from "./index.css";
import TabBar from "weui-miniprogram/miniprogram_dist/tabbar/tabbar";
import "weui-miniprogram/miniprogram_dist/weui-wxss/dist/style/weui.wxss";

const barList = [{
  "text": "对话",
  "iconPath": "icon.png",
  "selectedIconPath": "../../images/tabbar_icon_chat_active.png",
  dot: true,
},
{
  "text": "设置",
  "iconPath": "../../images/tabbar_icon_setting_default.png",
  "selectedIconPath": "../../images/tabbar_icon_setting_active.png",
  badge: "New",
}];

export default () => {

  const onLogin = () => {
    getUserInfo({ })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    
    <View className={styles.app}>
      <View className={styles.header}>
        <Image
          src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*OGyZSI087zkAAAAAAAAAAABkARQnAQ"
          className={styles.logo}
        />
        <View className={styles.text}>
          编辑 <Text className={styles.path}>src/pages/index/index.js</Text>{" "}
          开始
        </View>
        <Button onClick={onLogin}>
          申请登录
        </Button>
      </View>
      <TabBar className={styles.tabbar} list={barList}/>
    </View>
  );
};
