import { apis, DishSearchResult, Review } from "@/api/api";
import { getUserProfile } from "@/utils/getUserProfile";
import { useLoading } from "@/utils/hooks";
import { View, Text, Image, ScrollView } from "@remax/wechat";
import { Button, Loading, Rate, Space } from "annar";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "remax";
import { usePageEvent } from "remax/macro";
import { DishDetailBlock } from "./DishDetail";

import styles from "./index.css";
import { ReviewItem } from "./ReviewItem";

export const ReviewsPage: React.FC = () => {
  const query = useQuery();

  const dish = JSON.parse(query.dish!) as DishSearchResult;

  const page = useRef(1);
  const [results, setResults] = useState<Review[]>([]);
  const [loading, setLoading] = useLoading();

  const onMore = async () => {
    setLoading(true);
    page.current++;
    const resp = await apis.getUserReviews({ dishId: dish.id, page: page.current });
    setResults([...results, ...resp.results]);
    setLoading(false);
  };

  usePageEvent("onReachBottom", () => {
    onMore();
  });

  useEffect(() => {
    setLoading(true);
    setResults([]);
    apis.getUserReviews({ dishId: dish.id, page: page.current })
      .then((r) => {
        setResults([...results, ...r.results]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dish.id]);

  return (
    <View className={styles.content}>
      <View className={styles.top}>
        <ScrollView
          className={styles.scroller}
          lowerThreshold={200}
          scrollY onScrollToLower={onMore}
        >

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
              {
                results.length > 0
                  ? (
                    results.map((x) => (
                      <ReviewItem key={x.id} review={x} />
                    ))
                  )
                  : loading
                    ? <Loading />
                    : undefined
              }
            </View>
          </View>
        </ScrollView>
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

export default ReviewsPage;
