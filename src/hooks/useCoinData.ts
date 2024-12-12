import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { fetchCoins } from '../services/api';
import { APP_CONFIG } from '../config/constants';


export const useCoinsData = () => {
  const {
    setCoins,
    addNotification,
    setLoading,
    setError,
  } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCoins();
        setCoins(data);
        
        // Check for significant price changes
        data.forEach((coin) => {
          if (Math.abs(coin.price_change_percentage_24h) > APP_CONFIG.SIGNIFICANT_PRICE_CHANGE) {
            addNotification(
              `${coin.name} has ${
                coin.price_change_percentage_24h > 0 ? 'increased' : 'decreased'
              } by ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}% in the last 24h!`
            );
          }
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch cryptocurrency data';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, APP_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);
};