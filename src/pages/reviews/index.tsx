import { DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { getUserProfile } from "@/utils/getUserProfile";
import { View, Text, onWindowResize } from "@remax/wechat";
import { Button } from "annar";
import React from "react";
import { useQuery } from "remax";

import styles from "./index.css";
import { ReviewList } from "./ReviewList";

export const ReviewsPage: React.FC = () => {
  const query = useQuery();

  const dish = JSON.parse(query.dish!) as DishSearchResult;

  return (
    <View className={styles.content}>
      <DishItem dish={dish} />
      <View className={styles.title}>
        <Text>
        用户评价
        </Text>
      </View>
      <View className={styles.list}>
        <ReviewList dishId={dish.id} />
      </View>
      <View className={styles.comment}>
        <Button
          block
          type="primary"
          onTap={() => {
            getUserProfile()
              .then((x) => {
                wx.navigateTo({
                  url:
                  // eslint-disable-next-line max-len
                  `/pages/upload/existing/index?userId=${x.nickName}&dish=${query.dish}`,
                });
              });
          }}
        >
          我要评价此菜
        </Button>
      </View>
    </View>
  );
};

export  default ReviewsPage;
