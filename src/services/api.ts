import axios from 'axios';
import { Coin } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async (): Promise<Coin[]> => {
  const response = await axios.get(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=true`
  );
  return response.data;
};