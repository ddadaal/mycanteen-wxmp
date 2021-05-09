import { View, Text } from "@remax/wechat";
import React, { useEffect, useState } from "react";
import styles from "./index.css";
import { SearchPage } from "./SearchPage";

export default () => {

  const [children, setChildren] = useState(
    <View className={styles["request-login"]}>
      <Text>
        请求登录
      </Text>
    </View>
  );


  useEffect(() => {
    wx.getUserProfile({
      desc: "用于上传用户评价",
      success: (res) => {
        console.log(res);
        setChildren(
          <SearchPage userId={res.userInfo.nickName} />
        );
      },
    });
  });

  return children;
};
