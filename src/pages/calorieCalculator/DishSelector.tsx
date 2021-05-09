import { DishSelector } from "@/components/DishSelector";
import { useEventChannel } from "@/utils/useEventChannel";
import React from "react";

export const CalorieDishSelectorPage: React.FC = () => {

  const channel = useEventChannel();

  return (
    <DishSelector
      onSelect={(d) => {
        channel.emit("dishSelected", d);
        wx.navigateBack();
      }}
    />
  );
};

export default CalorieDishSelectorPage;
