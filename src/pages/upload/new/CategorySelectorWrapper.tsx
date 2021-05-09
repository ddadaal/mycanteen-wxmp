import { CategorySelector } from "@/components/CategorySelector";
import { CategoryId } from "@/models/dish";
import React from "react";

interface Props {
  value?: CategoryId;
  onChange?: (c: CategoryId) => void;
}

export const CategorySelectorWrapper: React.FC<Props> = ({
  value,
  onChange,
}) => {
  return (
    <CategorySelector
      selected={value}
      onSelect={onChange ? (e) => onChange(e.id) : undefined}
    />
  );
};
