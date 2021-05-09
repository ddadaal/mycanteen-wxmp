import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { navigateTo, View } from "@remax/wechat";
import styles from "./index.css";
import { Button, Cell, Loading } from "annar";
import { CanteenTexts } from "@/models/dish";
import { apis, Canteen, DishSearchResult } from "@/api/api";
import { ScrollView } from "remax/wechat";
import { DishItem } from "../../components/DishItem";
import { textObjectToArray } from "@/utils/textObjectToArray";
import { useLoading } from "@/utils/hooks";


const canteenRange=  textObjectToArray(CanteenTexts, "key", "text");

const canteenKeys = Object.keys(CanteenTexts);

interface Props {
  userId: string;
}

export const SearchPage: React.FC<Props> = ({ userId }) => {

  const page = React.useRef(1);
  const hasMore = React.useRef(true);

  const [canteen, setCanteen] = React.useState<Canteen | undefined>(undefined);

  const [text, setText] = React.useState("");
  const [results, setResults] = React.useState<DishSearchResult[]>([]);

  const [searched, setSearched] = React.useState(false);

  const [loading, setLoading] = useLoading();

  const update = async () => {
    if (canteen && text) {
      setResults([]);
      setSearched(true);
      setLoading(true);
      page.current = 1;
      return apis.searchDishes({ name: text, canteen: canteen })
        .then((x) => setResults(x.dishesItemList))
        .finally(() => setLoading(false));
    }
  };

  const onMore = async () => {
    if (loading || !hasMore.current) {
      return;
    }
    setLoading(true);
    page.current++;
    const resp = await apis.searchDishes({
      name: text,
      canteen: canteen,
      page: page.current,
    });
    if (resp.dishesItemList.length === 0) {
      hasMore.current = false;
    } else {
      setResults([...results, ...resp.dishesItemList]);
    }
    setLoading(false);
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
          <ScrollView
            style={{ height: "100%" }}
            scrollY
            onScrollToLower={onMore}
          >
            {
              (results.length > 0)
                ? (
                  results.map((x) => (
                    <DishItem key={x.id} dish={x} onClick={() => {
                      navigateTo({
                        url:
                        `/pages/upload/existing/index?dish=${JSON.stringify(x)}&userId=${userId}`,
                      });
                    }}
                    >
                        进入评价
                    </DishItem>
                  ))
                )
                : loading
                  ? <Loading />
                  : undefined
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
