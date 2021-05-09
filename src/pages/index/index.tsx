import * as React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { ScrollView, View } from "@remax/wechat";
import styles from "./index.css";
import { FilterRow, PriceRange } from "./components/FilterRow";
import { PositionRow } from "./components/PositionRow";
import { apis, SearchDishQuery } from "@/api/api";
import { DishItem } from "../../components/DishItem";
import { Col, Loading, Row, SearchBar } from "annar";
import { CategorySelector } from "@/components/CategorySelector";
import { useAsync } from "react-async";
import RecycleView from "miniprogram-recycle-view/miniprogram_dist/recycle-view";
import RecycleItem from "miniprogram-recycle-view/miniprogram_dist/recycle-item";


export default () => {

  const [query, setQuery] = React.useState({ page: 1 } as SearchDishQuery);

  const promiseFn = React.useCallback(() => {
    return apis.searchDishes(query).then((x) => x.dishesItemList);
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
            onClear={() => setQuery({ ...query, name: "" })}
          />
          <CategorySelector
            selected={query.category}
            onSelect={(c) => setQuery({ ...query, category: c.id })}
          />
          <PositionRow />
          <FilterRow
            canteen={query.canteen}
            onCanteenChange={(c) => setQuery({ ...query, canteen: c })}
            flavor={query.flavors?.[0]}
            onFlavorChange={(f) => setQuery({ ...query, flavors: [f]})}
            price={query.minPrice
              ? [query.minPrice, query.maxPrice!] as PriceRange
              : undefined}
            onPriceChange={(p) => setQuery({ ...query, minPrice: p[0], maxPrice: p[1] })}
            calorie={query.maxCalorie}
            onCalorieChange={(c) => setQuery({ ...query, maxCalorie: c })}
          />
        </View>
        <View className={styles["dishes-list"]}>
          <ScrollView style={{ height: "100%" }} scrollY>
            {
              isLoading
                ? <Loading />
                : data
                  ? (
                    data.map((x) => (
                      <DishItem key={x.id} dish={x}
                        onClick={() =>
                          wx.navigateTo({
                            url:
                            "/pages/reviews/index?dish=" + JSON.stringify(x),
                          })}
                      >
                        查看详情
                      </DishItem>
                    ))
                  ) : undefined
            }
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};
