import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { navigateTo, View } from "@remax/wechat";
import styles from "./index.css";
import { Button } from "annar";
import { DishSelector } from "@/components/DishSelector";
import { useRefreshToken } from "@/utils/refreshToken";


interface Props {
  userId: string;
}

export const SearchPage: React.FC<Props> = ({ userId }) => {


  const [refreshToken, update] = useRefreshToken();
  const [searched, setSearched] = React.useState(false);


  return (
    <MainLayout>
      <View className={styles.content}>

        <View className={styles.selector}>
          <DishSelector
            refreshToken={refreshToken}
            onSearch={() => setSearched(true)}
            onSelect={(d) => navigateTo({
              url:
        `/pages/upload/existing/index?dish=${JSON.stringify(d)}&userId=${userId}`,
              events: { "submitCompleted": () => {  update(); } },
            })}
          />
        </View>
        {
          searched
            ? (
              <View className={styles["add-new"]}>
                <Button
                  block
                  type="primary"
                  onTap={() => {
                    navigateTo({
                      url:
                      `/pages/upload/new/index?userId=${userId}`,
                    });
                  }}
                >
                  我要添加新菜
                </Button>
              </View>
            ) : undefined
        }
      </View>
    </MainLayout>
  );
};
