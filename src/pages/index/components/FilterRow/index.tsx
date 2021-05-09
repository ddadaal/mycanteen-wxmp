import { Canteen, Flavor } from "@/api/api";
import { CanteenTexts, FlavorTexts } from "@/models/dish";
import { View } from "@remax/wechat";
import { Filter } from "annar";
import type { OptionProps } from "annar/esm/selector";
import React from "react";
import styles from "./index.css";

const objectTextToOptions = (o: object) =>
  Object.entries(o)
    .reduce((prev, curr) => {
      prev.push({ value: curr[0], text: curr[1] });
      return prev;
    }, [] as OptionProps[]);

const canteenOptions = objectTextToOptions(CanteenTexts);

const flavorOptions = objectTextToOptions(FlavorTexts);

export const priceRanges = [
  [0, 5],
  [5, 10],
  [10, 15],
  [15, 20],
  [20, 30],
  [30, 40],
] as const;

export type PriceRange = typeof priceRanges[number];

const priceOptions = priceRanges.reduce((prev, curr) => {
  prev.push({ value: curr[0] + "", text: `${curr[0]}-${curr[1]}` });
  return prev;
}, [] as OptionProps[]);

const calorieOptions = objectTextToOptions({
  100: "很少（100 kCal）",
  200: "少（200 kCal）",
  300: "正常（300 kCal）",
  400: "有点多（400 kCal）",
  500: "多（500 kCal）",
  10000: "无限",
});

interface Props {
  canteen?: Canteen;
  onCanteenChange?: (canteen: Canteen) => void;
  flavor?: Flavor;
  onFlavorChange?: (flavor: Flavor) => void;
  price?: PriceRange;
  onPriceChange?: (priceRange: PriceRange) => void;
  calorie?: number;
  onCalorieChange?: (c: number) => void;
}

export const FilterRow: React.FC<Props> = ({
  canteen, onCanteenChange,
  flavor, onFlavorChange,
  price, onPriceChange,
  calorie, onCalorieChange,
}) => {
  return (
    <View className={styles.container}>
      <Filter>
        <Filter.Item
          value={canteen}
          title={"食堂"}
          options={canteenOptions}
          onChange={(e) => onCanteenChange?.(e.value as Canteen)}
        />
        <Filter.Item
          value={flavor}
          title="口味"
          options={flavorOptions}
          onChange={(e) => onFlavorChange?.(e.value as Flavor)}
        />
        <Filter.Item
          value={price
            ? priceRanges.find((x) => x[0] === price[0] && x[1] === price[1])?.[0] + ""
            : undefined}
          title="价格"
          options={priceOptions}
          onChange={(e) =>
            onPriceChange?.(priceRanges.find((x) => x[0] + "" === e.value)!)}
        />
        <Filter.Item
          value={calorie + ""}
          title="热量"
          options={calorieOptions}
          onChange={(e) => onCalorieChange?.(+e.value)}
        />
      </Filter>
    </View>
  );
};
