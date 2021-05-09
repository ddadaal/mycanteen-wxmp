import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { navigateTo, View } from "@remax/wechat";
import styles from "./index.css";
import { Button, Cell, Loading } from "annar";
import { CanteenTexts } from "@/models/dish";
import { apis, Canteen, DishSearchResult } from "@/api/api";
import { ScrollView } from "remax/wechat";
import { DishItem } from "../../components/DishItem";
import { useLoading } from "@/utils/hooks";
import { DishSelector } from "@/components/DishSelector";


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
        .then((x) => setResults(x))
        .finally(() => setLoading(false));
    }
  };

  React.useEffect(() => {
    update();
  }, [canteen, text]);

  return (
    <MainLayout>
      <View className={styles.content}>

        <View className={styles.selector}>

          <DishSelector
            onSearch={() => setSearched(true)}
            onSelect={(d) => navigateTo({
              url:
        `/pages/upload/existing/index?dish=${JSON.stringify(d)}&userId=${userId}`,
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
