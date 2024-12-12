
import { Toaster } from 'react-hot-toast';

import { SearchBar } from './components/search/SearchBar';
import { CoinList } from './components/coins/CoinList';
import { NotificationsPanel } from './components/notifications/NotificationsPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useStore } from './store/useStore';
import { useDarkMode } from './hooks/useDarkMode';
import { useCoinsData } from './hooks/useCoinData';
import { Header } from './components/layout/Header';


function App() {
  const {
    coins,
    favorites,
    isLoading,
    error,
    search,
  } = useStore();
  
  useDarkMode();
  useCoinsData();

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sortedByPerformance = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const topPerformers = sortedByPerformance.slice(0, 5);
  const bottomPerformers = sortedByPerformance.slice(-5).reverse();

  const favoriteCoins = coins.filter((coin) => favorites.includes(coin.id));

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <Header />
          <SearchBar />

          {isLoading && coins.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {favorites.length > 0 && (
                  <CoinList title="Favorites" coins={favoriteCoins} />
                )}
                <CoinList title="Top Performers" coins={topPerformers} />
                <CoinList title="Bottom Performers" coins={bottomPerformers} />
                {search && filteredCoins.length > 0 && (
                  <CoinList title="Search Results" coins={filteredCoins} />
                )}
              </div>

              <div className="lg:col-span-1">
                <NotificationsPanel />
              </div>
            </div>
          )}
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 4000,
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;