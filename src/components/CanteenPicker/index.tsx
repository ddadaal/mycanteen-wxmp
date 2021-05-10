import { Canteen } from "@/api/api";
import { CanteenRanges } from "@/models/dish";
import React from "react";
import { CellPicker } from "../CellPicker";

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
  return (
    <CellPicker
      range={CanteenRanges}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />

  );
};
