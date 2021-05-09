import { getUserProfile } from "@/utils/getUserProfile";
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
    getUserProfile()
      .then((x) => {
        setChildren(
          <SearchPage userId={x.nickName} />
        );
      });
  }, []);

  return children;
};
