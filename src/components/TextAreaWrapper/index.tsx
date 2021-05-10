import { Textarea } from "@remax/wechat";
import React from "react";

interface Props {
  value?: string;
  onChange?: (s: string) => void;
  placeholder?: string;
}

export const TextAreaWrapper: React.FC<Props> = ({ value, onChange, ...rest }) =>{
  return (
    <Textarea
      value={value}
      onInput={(e) => {
        onChange?.(e.detail.value);
      }}
      {...rest}
    />
  );
};
