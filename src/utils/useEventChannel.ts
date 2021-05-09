import { usePageInstance } from "remax";

export const useEventChannel = () => {
  return usePageInstance().getOpenerEventChannel();
};
