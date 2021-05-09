import { textObjectToArray } from "@/utils/textObjectToArray";

export const FlavorTexts = {
  Spicy : "辣",
  Sour: "酸",
  Sweet: "甜",
  Bitter: "苦",
};

export const FlavorRanges = textObjectToArray(FlavorTexts, "key", "text");

export const CanteenTexts = {
  XueYi : "学一食堂",
  JiaYuan1: "家园一层",
  JiaYuan2: "家园二层",
  JiaYuan3: "家园三层",
  JiaYuan4: "家园四层",
  NongYuan1: "农园一层",
  NongYuan2: "农园二层",
  NongYuan3: "农园三层",
};

export const CanteenRanges: { key: keyof typeof CanteenTexts, text: string }[]
= textObjectToArray(CanteenTexts, "key", "text") as any;

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
