import { textObjectToArray } from "@/utils/textObjectToArray";

export const FlavorTexts = {
  Spicy : "辣",
  Sour: "酸",
  Sweet: "甜",
  Bitter: "苦",
};

export const FlavorRanges = textObjectToArray(FlavorTexts, "key", "text");

export const CanteenTexts = {
  XueYi : "学一",
  JiaYuan1: "家园1",
  JiaYuan2: "家园2",
  JiaYuan3: "家园3",
  JiaYuan4: "家园4",
  NongYuan1: "农园一层",
  NongYuan2: "农园二层",
  NongYuan3: "农园三层",
};

export const CategoryTexts = {
  Breakfast: "早餐",
  Meal: "正餐",
  Snack: "小吃",
  Drinking: "水吧",
  Dessert: "甜点",
  Fruit: "水果",
};

export const Categories = textObjectToArray(CategoryTexts, "id", "text") as Category[];

export type CategoryId = keyof typeof CategoryTexts;

export type Category = {
  id: CategoryId;
  text: string;
}
