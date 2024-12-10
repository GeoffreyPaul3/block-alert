import React from 'react';
import { Star } from 'lucide-react';
import { Coin } from '../types/crypto';
import { useStore } from '../store/useStore';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface Props {
  coin: Coin;
}

export const CoinCard: React.FC<Props> = ({ coin }) => {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(coin.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <div>
            <h3 className="font-semibold dark:text-white">{coin.name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</span>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(coin.id)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <Star
            className={`w-5 h-5 ${
              isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400 dark:text-gray-500'
            }`}
          />
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Price:</span>
          <span className="font-medium dark:text-white">{formatCurrency(coin.current_price)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">24h Change:</span>
          <span
            className={`font-medium ${
              coin.price_change_percentage_24h >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Market Cap:</span>
          <span className="font-medium dark:text-white">{formatCurrency(coin.market_cap)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Volume:</span>
          <span className="font-medium dark:text-white">{formatCurrency(coin.total_volume)}</span>
        </div>
      </div>
    </div>
  );
};