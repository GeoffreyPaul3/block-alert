import React from 'react';

import { Coin } from '../../types/crypto';
import { CoinCard } from './CoinCard';

interface CoinListProps {
  title: string;
  coins: Coin[];
}

export const CoinList: React.FC<CoinListProps> = ({ title, coins }) => {
  if (coins.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};