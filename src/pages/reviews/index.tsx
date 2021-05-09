import { DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { getUserProfile } from "@/utils/getUserProfile";
import { View, Text, Image } from "@remax/wechat";
import { Button, Rate, Space } from "annar";
import React from "react";
import { useQuery } from "remax";
import { DishDetailBlock } from "./DishDetail";

import styles from "./index.css";
import { ReviewList } from "./ReviewList";

export const ReviewsPage: React.FC = () => {
  const query = useQuery();

  const dish = JSON.parse(query.dish!) as DishSearchResult;

  return (
    <View className={styles.content}>
      <View className={styles.top}>
        <View className={styles.showcase}>
          <Image className={styles.image} mode="aspectFill" src={dish.pictureUrl}/>
        </View>
        <View className={styles.info}>
          <View className={styles.dishtitle}>
            <View className={styles.text}>
              <Text>
                {dish.name}
              </Text>
            </View>
            <View className={styles.rate}>
              <Space>
                <Text>
                  {dish.rateNumber} 评分
                </Text>
                <Rate value={dish.rate} readOnly />
              </Space>
            </View>
          </View>
          <View className={styles.title}>
            <Text>
        详细信息
            </Text>
          </View>
          <View>
            <DishDetailBlock dish={dish} />
          </View>
          <View className={styles.title}>
            <Text>
        用户评价
            </Text>
          </View>
          <View className={styles.list}>
            <ReviewList dishId={dish.id} />
          </View>
        </View>
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
