import { apis, Canteen, CanteenStats, DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { CanteenTexts } from "@/models/dish";
import { globals, setGlobal } from "@/utils/globals";
import { useLoading } from "@/utils/hooks";
import { View, Text } from "@remax/wechat";
import { Button, Loading, Progress } from "annar";
import React, { useEffect, useState } from "react";
import styles from "./index.css";

export const CanteenStatsPage: React.FC = () => {

  const [loading, setLoading] = useLoading();
  const [stats, setStats] = useState<CanteenStats | undefined>();

  const update = async () => {
    setLoading(true);
    setStats(await apis.getCanteenStats());
    setLoading(false);
  };

  useEffect(() => {
    update();
  },[]);

  return (
    <View className={styles.content}>
      <View className={styles.pagetitle}>
        <Text>
          食堂人数
        </Text>
      </View>
      {
        stats
          ? (
            stats.rows.map((x) => {
              const canteen = Object.keys(CanteenTexts)
                .find((i) => CanteenTexts[i] === x.name);

              return (
                <View key={x.name} className={styles.stat}
                  onClick={() => {
                    if (canteen) {
                      setGlobal("indexPageCanteen", canteen);
                      wx.switchTab({ url: "/pages/index/index" });
                    }
                  }}
                >
                  <View className={styles.titlerow}>
                    <View className={styles.title}>
                      <Text>
                        {x.name}
                      </Text>
                    </View>
                    <View className={styles.number}>
                      <Text>
                        {x.ip} / {x.seat}
                      </Text>
                    </View>
                  </View>
                  <View className={styles.progress}>
                    <Progress
                      color="#FFAE00"
                      percent={x.ip / x.seat * 100}
                    />
                  </View>
                </View>
              );
            })
          ) : loading
            ? <Loading />
            : undefined
      }
    </View>
  );
};

export default CanteenStatsPage;
