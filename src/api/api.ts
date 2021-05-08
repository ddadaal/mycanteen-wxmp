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
  "name": string,
  "price": number,
  "canteen": Canteen,
  "calorie": number,
  "rate": number;
  "rateNumber": number,
  "pictureUrl": string;
}

export const apis = {
  searchDishes: () => ({
    results: [
      {
        calorie: 32,
        name: "番茄炒蛋",
        price: 3,
        canteen: Canteen.JiaYuan1,
        rate: 32,
        rateNumber: 1333,
        pictureUrl: "/images/dishitem/example.png",
      },
    ] as DishSearchResult[],
  }),
};
