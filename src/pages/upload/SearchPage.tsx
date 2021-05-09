import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { getUserInfo, navigateTo, View } from "@remax/wechat";
import styles from "./index.css";
import { Button, Cell, Loading } from "annar";
import { CanteenTexts } from "@/models/dish";
import { apis, Canteen, DishSearchResult } from "@/api/api";
import { useAsync } from "react-async";
import { ScrollView } from "remax/wechat";
import { DishItem } from "../../components/DishItem";
import { textObjectToArray } from "@/utils/textObjectToArray";


const canteenRange=  textObjectToArray(CanteenTexts, "key", "text");

const canteenKeys = Object.keys(CanteenTexts);

interface Props {
  userId: string;
}

export const SearchPage: React.FC<Props> = () => {

  const [canteen, setCanteen] = React.useState<Canteen | undefined>(undefined);
  const [text, setText] = React.useState("");
  const [results, setResults] = React.useState<DishSearchResult[] | undefined>(undefined);
  const [searched, setSearched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const update = async () => {
    if (canteen && text) {
      setSearched(true);
      setLoading(true);
      return apis.searchDishes({ name: text, canteen: canteen })
        .then((x) => setResults(x.results))
        .finally(() => setLoading(false));
    }
  };

  React.useEffect(() => {
    update();
  }, [canteen, text]);

  return (
    <MainLayout>
      <View className={styles.content}>
        <View className={styles.filter}>
          <Cell.Picker
            required
            label="食堂"
            placeholder="请选择食堂"
            arrow
            range={canteenRange}
            value={canteen ? canteenKeys.indexOf(canteen) : undefined}
            onChange={(i: number) => setCanteen(canteenKeys[i] as Canteen)}
          />

          <Cell.Input
            label="关键词"
            placeholder="输入菜品关键词"
            border={false}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </View>
        <View className={styles.list}>
          <ScrollView style={{ height: "100%" }} scrollY>
            {
              loading
                ? <Loading />
                : results
                  ? (
                    results.map((x) => (
                      <DishItem key={x.id} dish={x} onClick={() => {
                        navigateTo({
                          url:
                          `/pages/upload/CommentExisting/index?dish=${JSON.stringify(x)}`,
                        });
                      }}
                      >
                        进入评价
                      </DishItem>
                    ))
                  ) : undefined
            }
          </ScrollView>
        </View>
        {
          searched
            ? (
              <View className={styles["add-new"]}>
                <Button
                  block
                  type="primary"
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
