import { CategoryButton } from "./CategoryButton";
import { Row, Col } from "annar";
import React from "react";
export const Categories = [
  { id: "breakfast", text: "早餐" },
  { id: "meal", text: "正餐" },
  { id: "snack", text: "小吃" },
  { id: "drinking", text: "饮品" },
  { id: "dessert", text: "甜点" },
  { id: "fruit", text: "水果" },
] as const;

export type Category = typeof Categories[number];
export type CategoryId = Category["id"];

interface Props {
  selected?: CategoryId;
  onSelect?: (c: Category) => void;
}

export const CategorySelector: React.FC<Props> = ({
  selected,
  onSelect,
}) => {
  return (
    <Row>
      {
        Categories.map((c) => (
          <Col span={4} key={c.text}>
            <CategoryButton
              category={c}
              selected={selected === c.id}
              onSelect={onSelect}
            />
          </Col>
        ))
      }
    </Row>
  );
};
