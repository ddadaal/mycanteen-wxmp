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
  dishId: string;
  "name": string,
  "price": number,
  "canteen": Canteen,
  "calorie": number,
  "rate": number;
  "rateNumber": number,
  "pictureUrl": string;
  "flavor": Flavor;
  avgWaitTime: number;
}

export interface SearchDishQuery {
  name?: string;
  category?: CategoryId;
  canteen?: Canteen;
  minPrice?: number;
  maxPrice?: number;
  flavors?: Flavor[];
  maxCalorie?: number;
  waitTime?: number;
  page?: number;
}

export interface Review {
  id: string;
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

const mockReview = (id: number) => ({
  id: id+"",
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
});


const apiRoot = "http://139.198.171.207:2543";

const MOCK = true;
// const MOCK = false;

const mockDish = (id: number) => ({
  dishId: id + "",
  calorie: 32,
  name: "番茄炒蛋",
  price: 300,
  canteen: Canteen.JiaYuan1,
  rate: 4,
  rateNumber: 1333,
  pictureUrl: "/images/dishitem/example.png",
  flavor: Flavor.Bitter,
  avgWaitTime: 14.3,
} as DishSearchResult);

export interface CanteenStat {
  name: string;
  seat: number;
  ip: number;
  warningMsg: string;
}

export interface CanteenStats {
  time: string;
  rows: CanteenStat[];
}

const jsonRequest = (method: "GET" | "POST", url: string, data?: object) =>
  request({ method, url: apiRoot + url, data })
    .then((x) => x.data.results);

export const apis = {
  searchDishes: async (query: SearchDishQuery): Promise<DishSearchResult[]> =>  {
    console.log(query);
    if (MOCK){
      return range(0, 10).map((i) => mockDish(query.page! *10 +i));
    } else {
      return await jsonRequest("GET", "/dishes/getList", query);
    }

  },
  uploadExistingDish: async (body: {
    dishId: string, description: string, pictureUrls: string[], userId: string,
    rate: number, flavor?: Flavor, waitTime?: number, price?: number,
  }) => {
    if (!MOCK) {
      await jsonRequest("POST", "/dish/existing", body);
    }
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
    calorie?: number;
  }) => {
    if (!MOCK) {
      await jsonRequest("POST", "/dish/new", body);
    }
  },
  getUserReviews: async (query: {
    dishId: string;
    page?: number;
  }): Promise<Review[]> => {
    if (MOCK) {
      return range(0, 10).map((i) => mockReview(query.page! * 10 + i));
    } else {
      return jsonRequest("GET", "/reviews/getList", query).then((x) => x.reviewItemList);
    }

  },
  /** 返回地址 */
  uploadFile: async (filePath: string): Promise<string> => {
    // https://pic.onji.cn/
    const resp = await uploadFile({
      url: "https://pic.onji.cn/api/toutiao.php",
      filePath,
      name: "image",
    });

    return JSON.parse(resp.data).data.url;

  },
  getDishById: async (id: string): Promise<DishSearchResult> => {
    if (MOCK) {
      return mockDish(+id);
    } else {
      return jsonRequest("GET", "/dishes/getOne", { dishId: id }).then((x) => x);
    }
  },
  getCanteenStats: async (): Promise<CanteenStats> => {
    if (MOCK) {
      return {
        time: "",
        rows: [
          {
            "name": "燕南美食",
            "seat": 280,
            "ip": 123,
            "warningMsg": "",
          },
          {
            "name": "农园一层",
            "seat": 782,
            "ip": 61,
            "warningMsg": "",
          },
        ],
      };
    } else {
      return jsonRequest("GET", "/canteen/status");
    }
  },
};
