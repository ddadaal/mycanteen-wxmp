import { useEffect, useState } from "react";

export const useLoading = () => {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      wx.showNavigationBarLoading();
    } else {
      wx.hideNavigationBarLoading();
    }
  }, [loading]);

  return [loading, setLoading] as const;
};
