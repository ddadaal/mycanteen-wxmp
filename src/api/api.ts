import { Categories, Category, CategoryId } from "@/models/dish";
import { range } from "@/utils/range";
import { request } from "@remax/wechat";
import { uploadFile } from "remax/wechat";

export enum Flavor {
  Spicy = "Spicy",
  Sour = "Sour",
  Sweet = "Sweet",
  Bitter = "Bitter"
}
export enum Canteen {
  XueYi = "XueYi",
  JiaYuan1 = "JiaYuan1",
  JiaYuan2 =  "JiaYuan2",
  JiaYuan3 =  "JiaYuan3",
  JiaYuan4 =  "JiaYuan4",
  NongYuan1 =  "NongYuan1",
  NongYuan2 =  "NongYuan2",
  NongYuan3 =  "NongYuan3",
}


export interface DishSearchResult {
  id: number;
  "name": string,
  "price": number,
  "canteen": Canteen,
  "calorie": number,
  "rate": number;
  "rateNumber": number,
  "pictureUrl": string;
}

export interface SearchDishQuery {
  name?: string;
  category?: CategoryId;
  canteen?: Canteen;
  minPrice?: number;
  maxPrice?: number;
  flavors?: Flavor[];
  ingredients?: string[];
  maxCalorie?: number;
  waitTime?: number;
  page?: number;
}

export interface Review {
  id: number;
  time: string; // ISO格式
userId: string;
rate: number;
description: string;
flavor?: Flavor;
waitTime?: number;
price?: number;
category: CategoryId;
pictureUrls: string[];
}

const mockReview: Review = {
  id: 1,
  time: "2021-05-09T04:29:28.811Z",
  userId: "ddadaal",
  rate: 4,
  description: "这菜好啊！",
  flavor: Flavor.Bitter,
  price: 800,
  category: Categories["0"].id,
  pictureUrls: [
    "https://p6-tt.byteimg.com/origin/pgc-image/47ba476b431f4430871ea54c92f807f3.png",
  ],
};

const apiRoot = "http://139.198.171.207:2543";

const mockDish = {
  id: 1,
  calorie: 32,
  name: "番茄炒蛋",
  price: 3,
  canteen: Canteen.JiaYuan1,
  rate: 4,
  rateNumber: 1333,
  pictureUrl: "/images/dishitem/example.png",
};

const jsonRequest = (method: "GET" | "POST", url: string, data?: object) =>
  request({ method, url: apiRoot + url, data })
    .then((x) => x.data.results);

export const apis = {
  searchDishes: async (query: SearchDishQuery) =>  {
    // return await jsonRequest("GET", "/dishes/getList");

    return { dishesItemList: range(0, 10).map(() => mockDish) };

  },
  uploadExistingDish: async (body: {
    id: number, description: string, pictureUrls: string[], userId: string,
    rate: number, flavor?: Flavor, waitTime?: number, price?: number,
  }) => {
    // ignored
    await jsonRequest("POST", "/dish/existing", body);
  },
  uploadNewDish: async (body: {
    description: string;
    pictureUrls: string[];
    name?: string;
    rate: number;
    flavor?: Flavor;
    waitTime?: number;
    price?: number;
    category: CategoryId;
    canteen: Canteen
    userId: string;
  }) => {
    await jsonRequest("POST", "/dish/new", body);
  },
  getUserReviews: async (query: {
    dishId: number;
    page?: number;
  }) => {
    // return jsonRequest("GET", "/reviews", query);

    return { results: range(0, 10).map(() => mockReview) };
  },
  /** 返回地址 */
  uploadFile: async (filePath: string): Promise<string> => {
    // https://pic.onji.cn/
    const resp = await uploadFile({
      url: "https://pic.onji.cn/api/toutiao.php",
      filePath,
      name: "image",
    });

    console.log(resp);

    return JSON.parse(resp.data).data.url;

  },
};
