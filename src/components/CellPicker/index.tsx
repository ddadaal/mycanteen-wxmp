import { Cell } from "annar";
import React from "react";
import { Picker } from "remax/wechat";

interface Props {
  value?: string;
  onChange?: (c: string) => void;
  placeholder?: string;
  label?: string;
  range: { id: string; text: string}[];
}

export const CellPicker: React.FC<Props> = ({
  value,
  onChange,
  placeholder, label, range,
}) => {
  return (
    <Cell
      // placeholder={placeholder}
      label={label}
    >
      <Picker
        range={range}
        rangeKey="text"
        value={range.findIndex((x) => x.id === value)}
        onChange={(e) => onChange?.(range[e.detail.value as number].id)}
      >
        {
          value
            ? range.find((x) => x.id === value)?.text
            : placeholder
        }
      </Picker>
    </Cell>
  );
};
