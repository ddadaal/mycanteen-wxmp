import { Canteen } from "@/api/api";
import { CanteenRanges } from "@/models/dish";
import { Cell } from "annar";
import React from "react";

interface Props {
  value?: Canteen;
  onChange?: (c: Canteen) => void;
  placeholder?: string;
  label?: string;
}

export const CanteenPicker: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  label,
}) => {
  console.log(value, CanteenRanges.findIndex((x) => x.key === value));
  return (
    <Cell.Picker
      placeholder={placeholder}
      label={label}
      range={CanteenRanges}
      value={CanteenRanges.findIndex((x) => x.key === value)}
      onChange={(v) => onChange?.(CanteenRanges[v].key as Canteen)}
    />
  );
};
