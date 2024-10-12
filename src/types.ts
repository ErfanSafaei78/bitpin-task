export type FetchStatus = "loading" | "error" | "success";

export interface Currency {
  id: number;
  title: string;
  title_fa: string;
  code: string;
  image: string;
  color: string;
}

export interface Market {
  id: number;
  currency1: Currency;
  currency2: Currency;
  price_info: {
    price: string;
    change: number;
  };
  price: string;
  title: string;
  code: string;
  title_fa: string;
}

export interface MarketResponse {
  results: Market[];
}

export interface ActiveOrder {
  remain: string;
  price: string;
  value: string;
}

export interface ActiveOrdersResponse {
  orders: ActiveOrder[];
}

export interface Match {
  time: number;
  price: string;
  match_amount: string;
}
