import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { CoinCard } from './components/CoinCard';
import { SearchBar } from './components/SearchBar';
import { NotificationsPanel } from './components/NotificationsPanel';
import { useStore } from './store/useStore';
import { fetchCoins } from './services/api';

function App() {
  const { coins, setCoins, darkMode, toggleDarkMode, favorites, addNotification } = useStore();
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoins();
        setCoins(data);
        
        // Check for significant price changes
        data.forEach((coin) => {
          if (Math.abs(coin.price_change_percentage_24h) > 10) {
            addNotification(
              `${coin.name} has ${
                coin.price_change_percentage_24h > 0 ? 'increased' : 'decreased'
              } by ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}% in the last 24h!`
            );
          }
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Failed to fetch cryptocurrency data');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [addNotification, setCoins]);

  // Filter coins based on search
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Get top and bottom performers
  const sortedByPerformance = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const topPerformers = sortedByPerformance.slice(0, 5);
  const bottomPerformers = sortedByPerformance.slice(-5).reverse();

  // Get favorite coins
  const favoriteCoins = coins.filter((coin) => favorites.includes(coin.id));

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold dark:text-white">Block Alert</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          <SearchBar value={search} onChange={setSearch} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {favorites.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Favorites</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteCoins.map((coin) => (
                      <CoinCard key={coin.id} coin={coin} />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Top Performers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topPerformers.map((coin) => (
                    <CoinCard key={coin.id} coin={coin} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Bottom Performers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bottomPerformers.map((coin) => (
                    <CoinCard key={coin.id} coin={coin} />
                  ))}
                </div>
              </div>

              {search && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Search Results</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCoins.map((coin) => (
                      <CoinCard key={coin.id} coin={coin} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <NotificationsPanel />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;