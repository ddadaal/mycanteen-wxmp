let userInfo: WechatMiniprogram.UserInfo | undefined = undefined;

export const getUserProfile = () => {
  return new Promise<WechatMiniprogram.UserInfo>((resolve) => {
    if (!userInfo) {
      wx.getUserProfile({
        desc: "用于评分",
        success: (info) => {
          userInfo = info.userInfo;
          resolve(userInfo);
        },
      });
    } else {
      resolve(userInfo);
    }
  });
};
