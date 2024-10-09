import axios from "axios";
import { MarketResponse } from "./types";

const baseURL = "https://api.bitpin.org";

const api = axios.create({
  baseURL,
});

export const getMarketList = async () => {
  const response = await api.get<MarketResponse>("/v1/mkt/markets/");
  return response.data.results;
};
