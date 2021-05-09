import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { View } from "@remax/wechat";
import styles from "./index.css";
import { FilterRow } from "./components/FilterRow";
import { PositionRow } from "./components/PositionRow";
import { apis, SearchDishQuery } from "@/api/api";
import { DishItem } from "./components/DishItem";
import { Col, Loading, Row, SearchBar } from "annar";
import { Category, CategoryId, CategorySelector } from "@/components/CategorySelector";
import { useAsync } from "react-async";
import RecycleView from "miniprogram-recycle-view/miniprogram_dist/recycle-view";
import RecycleItem from "miniprogram-recycle-view/miniprogram_dist/recycle-item";


export default () => {

  const [query, setQuery] = React.useState({ page: 1 } as SearchDishQuery);

  const promiseFn = React.useCallback(() => {
    return apis.searchDishes(query).then((x) => x.results);
  }, [query]);

  const { data, isLoading } = useAsync({ promiseFn });

  return (
    <MainLayout>
      <View className={styles.content}>
        <View className={styles.filters}>
          <SearchBar
            value={query.name}
            placeholder="今天想吃点什么"
            onInput={(v) => setQuery({ ...query, name: v })}
          />
          <CategorySelector
            selected={query.category}
            onSelect={(c) => setQuery({ ...query, category: c.id })}
          />
          <PositionRow />
          <FilterRow />
        </View>
        <View className={styles["dishes-list"]}>
          {
            isLoading
              ? <Loading />
              : data
                ? (
                  data.map((x) => (
                    <DishItem key={x.id} dish={x} />
                  ))
                ) : undefined
          }
        </View>
      </View>
    </MainLayout>
  );
};
