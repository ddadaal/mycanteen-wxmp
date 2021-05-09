import { CategoryButton } from "./CategoryButton";
import { Row, Col } from "annar";
import React from "react";
import { Categories, Category, CategoryId } from "@/models/dish";


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
