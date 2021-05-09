import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { navigateTo, View } from "@remax/wechat";
import styles from "./index.css";
import { Button, Cell, Loading } from "annar";
import { CanteenTexts } from "@/models/dish";
import { apis, Canteen, DishSearchResult } from "@/api/api";
import { ScrollView } from "remax/wechat";
import { DishItem } from "../DishItem";
import { textObjectToArray } from "@/utils/textObjectToArray";
import { useLoading } from "@/utils/hooks";
import classnames from "classnames";

const canteenRange=  textObjectToArray(CanteenTexts, "key", "text");

const canteenKeys = Object.keys(CanteenTexts);

interface Props {
  onSelect: (dish: DishSearchResult) => void;
  onSearch?: (p: { canteen: Canteen | undefined, text: string }) => void;
  className?: string;
  refreshToken?: boolean;
}

export const DishSelector: React.FC<Props> = ({
  onSelect,
  onSearch, className, refreshToken,
}) => {

  const page = React.useRef(1);
  const hasMore = React.useRef(true);

  const [canteen, setCanteen] = React.useState<Canteen | undefined>(undefined);

  const [text, setText] = React.useState("");
  const [results, setResults] = React.useState<DishSearchResult[]>([]);

  const [loading, setLoading] = useLoading();

  const update = async () => {
    if (canteen || text) {
      setResults([]);
      setLoading(true);
      onSearch?.({ canteen, text });
      page.current = 1;
      return apis.searchDishes({ name: text, canteen: canteen })
        .then((x) => setResults(x))
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
    if (resp.length === 0) {
      hasMore.current = false;
    } else {
      setResults([...results, ...resp]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    update();
  }, [canteen, text, refreshToken]);

  return (
    <View className={classnames(styles.content, className)}>
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
                  <DishItem key={x.dishId} dish={x} onClick={() => {
                    onSelect(x);
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
    </View>
  );
};
