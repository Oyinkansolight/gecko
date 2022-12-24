import { instance } from '@/utils/fetcher';

export const CoinGeckoAPI = {
  async trendingCoins() {
    const { data } = await instance.get('search/trending');

    return data;
  },
  async getTickers(id: string) {
    const { data } = await instance.get(`coins/${id}/tickers`);

    return data;
  },
  async allCoins() {
    const { data } = await instance.get('coins/list');

    return data;
  },
  async getCoin(id: string) {
    const { data } = await instance.get(`coins/${id}`);

    return data;
  },
  async getCoinHistory(id: string, from: string, to: string) {
    const { data } = await instance.get(
      `coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
    );

    return data;
  },
  async getExchangeRates() {
    const { data } = await instance.get('exchange_rates');

    return data;
  },
};
