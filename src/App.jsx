import { useEffect, useState, useContext } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyChart from './components/HourlyChart';
import WeeklyChart from './components/WeeklyChart';
import Forecast from './components/Forecast';
import Favorites from './components/Favorites';
import ThemeToggle from './components/ThemeToggle';
import UnitToggle from './components/UnitToggle';
import LanguageToggle from './components/LanguageToggle';

import RecentSearches from './components/RecentSearches';
import WeatherAlert from './components/WeatherAlert';
import { CurrentWeatherSkeleton, WeatherDetailsSkeleton, HourlyChartSkeleton, WeeklyChartSkeleton, ForecastSkeleton } from './components/Skeletons';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PreferencesContext } from './context/PreferencesContext';
import { useTranslation } from './hooks/useTranslation';
import { CloudRain, AlertCircle, Loader2, WifiOff } from 'lucide-react';

function App() {
  const { data, loading, error, getWeather, setError } = useWeather();
  const { getLocation, loading: locating } = useGeolocation();
  const { unit, language } = useContext(PreferencesContext);
  const { t } = useTranslation();
  
  const [favorites, setFavorites] = useLocalStorage('weather-favorites', []);
  const [recentSearches, setRecentSearches] = useLocalStorage('weather-recent-searches', []);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getWeatherBg = () => {
    if (!data || !data.current) return 'from-blue-50 to-cyan-100 dark:from-slate-900 dark:to-blue-950';
    const condition = data.current.weather[0].main;
    switch (condition) {
      case 'Clear': return 'from-orange-100 to-amber-200 dark:from-indigo-950 dark:to-slate-900';
      case 'Clouds': return 'from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900';
      case 'Rain':
      case 'Drizzle': return 'from-blue-200 to-slate-400 dark:from-slate-900 dark:to-blue-950';
      case 'Thunderstorm': return 'from-slate-600 to-slate-800 dark:from-slate-950 dark:to-slate-900';
      case 'Snow': return 'from-blue-50 to-slate-200 dark:from-slate-800 dark:to-slate-700';
      default: return 'from-blue-50 to-cyan-100 dark:from-slate-900 dark:to-blue-950';
    }
  };

  const [currentApiQuery, setCurrentApiQuery] = useState({ q: favorites.length > 0 ? favorites[0] : 'London' });

  // Initial load or Language change
  useEffect(() => {
    getWeather({ ...currentApiQuery, lang: language });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    const newQuery = { q: query };
    setCurrentApiQuery(newQuery);
    const success = await getWeather({ ...newQuery, lang: language });
    if (success) {
      setRecentSearches((prev) => {
        // Remove case-insensitive duplicates and prepend the new search
        const filtered = prev.filter(c => c.toLowerCase() !== query.toLowerCase());
        return [query, ...filtered].slice(0, 5); // Keep last 5
      });
    }
  };

  const handleLocation = async () => {
    try {
      const coords = await getLocation();
      const newQuery = { ...coords };
      setCurrentApiQuery(newQuery);
      getWeather({ ...newQuery, lang: language });
    } catch (err) {
      setError(err);
    }
  };

  const toggleFavorite = (city) => {
    if (favorites.includes(city)) {
      setFavorites(favorites.filter(c => c !== city));
    } else {
      setFavorites([...favorites, city]);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${getWeatherBg()} transition-colors duration-1000`} />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/30 dark:bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-300/30 dark:bg-cyan-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl flex flex-col min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/40 dark:bg-black/30 rounded-2xl backdrop-blur-md shadow-sm border border-white/40 dark:border-white/10">
              <CloudRain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              WeatherDash
            </h1>
          </div>
          <div className="flex items-center gap-3">

            <LanguageToggle />
            <UnitToggle />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-grow">
          {isOffline && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-slate-800 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg animate-fade-in">
              <WifiOff className="w-6 h-6 text-slate-300" />
              <span className="font-semibold">{t('noInternet')}</span>
            </div>
          )}

          <div className="mb-8">
            <SearchBar onSearch={handleSearch} onLocation={handleLocation} isLocating={locating} />
          </div>

          {recentSearches.length > 0 && (
            <div className="-mt-6 mb-8 relative z-10">
              <RecentSearches 
                searches={recentSearches} 
                onSelect={handleSearch} 
                onClear={() => setRecentSearches([])}
              />
            </div>
          )}

          <Favorites 
            favorites={favorites} 
            onSelect={handleSearch} 
            onRemove={toggleFavorite}
            onAdd={toggleFavorite}
            currentCity={data?.current?.name}
          />

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-5 bg-red-100/90 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 rounded-2xl flex items-center gap-4 backdrop-blur-md animate-[fade-in_0.3s_ease-out] shadow-lg">
              <AlertCircle className="w-7 h-7 flex-shrink-0" />
              <p className="font-medium text-lg">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
                <CurrentWeatherSkeleton />
              </div>
              <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
                <WeatherDetailsSkeleton />
                <HourlyChartSkeleton />
                <WeeklyChartSkeleton />
                <ForecastSkeleton />
              </div>
            </div>
          ) : (
            data && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
                  {data && <WeatherAlert data={data.current} />}
                  <CurrentWeather data={data.current} />
                </div>
                <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
                  <WeatherDetails data={data} />
                  <HourlyChart forecastData={data.forecast} />
                  <WeeklyChart forecastData={data.forecast} />
                  <Forecast forecastData={data.forecast} dailyDetails={data.dailyDetails} />
                </div>
              </div>
            )
          )}
        </main>

        <footer className="mt-16 pb-4 text-center text-slate-500 dark:text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} WeatherDash. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
