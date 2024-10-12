import axios from "axios";
import { ActiveOrdersResponse, MarketResponse, Match } from "./types";

const baseURL = "https://api.bitpin.org";

const api = axios.create({
  baseURL,
});

export const getMarketList = async () => {
  const response = await api.get<MarketResponse>("/v1/mkt/markets/");
  return response.data.results;
};

export const getActiveOrders = async (
  marketId: string,
  type: "buy" | "sell"
) => {
  const response = await api.get<ActiveOrdersResponse>(
    `/v2/mth/actives/${marketId}/`,
    {
      params: {
        type,
      },
    }
  );

  return response.data.orders;
};

export const getMatches = async (marketId: string) => {
  const response = await api.get<Match[]>(`/v1/mth/matches/${marketId}/`);
  return response.data;
};
