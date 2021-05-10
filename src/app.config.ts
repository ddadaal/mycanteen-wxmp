import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
    "pages/index/index",
    "pages/reviews/index",
    "pages/upload/index",
    "pages/upload/existing/index",
    "pages/upload/new/index",
    "pages/profile/index",
    "pages/calorieCalculator/index",
    "pages/calorieCalculator/DishSelector",
    "pages/canteenStats/index",
  ],
  window: { navigationBarTitleText: "校园大众点评" },
  "tabBar": {
    "color": "#000000",
    "selectedColor": "#E59160",
    "backgroundColor": "#ffffff",
    "list": [{
      "text": "主页",
      "pagePath": "pages/index/index",
      "iconPath": "/images/tabbar/home.png",
      "selectedIconPath": "/images/tabbar/home-selected.png",
    },{
      "text": "发布",
      "pagePath": "pages/upload/index",
      "iconPath": "/images/tabbar/upload.png",
      "selectedIconPath": "/images/tabbar/upload-selected.png",
    }, {
      "text": "热量计算",
      "pagePath": "pages/calorieCalculator/index",
      "iconPath": "/images/tabbar/calorie.png",
      "selectedIconPath": "/images/tabbar/calorie-selected.png",
    }, {
      "text": "食堂人数",
      "pagePath": "pages/canteenStats/index",
      "iconPath": "/images/tabbar/stat.png",
      "selectedIconPath": "/images/tabbar/stat-selected.png",
    }],
  },
};

export default config;
