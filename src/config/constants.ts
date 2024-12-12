// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    ENDPOINTS: {
      MARKETS: '/coins/markets',
    },
    DEFAULT_PARAMS: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      sparkline: true,
    },
  } as const;
  
  // App Configuration
  export const APP_CONFIG = {
    REFRESH_INTERVAL: 60000, // 1 minute
    MAX_NOTIFICATIONS: 50,
    SIGNIFICANT_PRICE_CHANGE: 10, // percentage
  } as const;