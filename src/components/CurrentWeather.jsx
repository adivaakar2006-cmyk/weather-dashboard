import { format } from 'date-fns';
import { Droplets, Wind, Thermometer, Gauge, Share2, Eye, Sunrise, Sunset } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, capitalizeWords, formatTime } from '../utils/format';
import { useContext } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';
import { useTranslation } from '../hooks/useTranslation';

export default function CurrentWeather({ data }) {
  const { unit, language } = useContext(PreferencesContext);
  const { t } = useTranslation();
  if (!data) return null;

  const windSpeed = unit === 'imperial' ? (data.wind.speed * 2.23694).toFixed(1) : data.wind.speed;
  const windUnit = unit === 'imperial' ? 'mph' : 'm/s';

  const handleShare = async () => {
    const shareText = `Check out the weather in ${data.name}: ${formatTemperature(data.main.temp, unit)} and ${capitalizeWords(data.weather[0].description)}!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Weather in ${data.name}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        alert('Weather report copied to clipboard!');
      } catch (err) {
        alert('Sharing is not supported on this browser.');
      }
    }
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 dark:bg-black/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex justify-between items-start mb-6 relative z-10 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight break-words">
              {data.name}
              {data.sys?.country && <span className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium">, {data.sys.country}</span>}
            </h2>
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-full bg-slate-200/50 hover:bg-slate-300 dark:bg-slate-700/50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-all shadow-sm shrink-0 mt-1"
              title="Share Weather"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            {new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' }).format(new Date((data.dt + data.timezone) * 1000))}
          </p>
        </div>
        <div className="bg-white/40 dark:bg-slate-800/60 p-2 sm:p-3 rounded-xl shadow-sm border border-white/50 dark:border-slate-600/50 shrink-0">
          <WeatherIcon 
            code={data.weather[0].icon} 
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-7xl sm:text-8xl font-black tracking-tighter text-slate-800 dark:text-white drop-shadow-sm leading-none">
            {formatTemperature(data.main.temp, unit)}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-slate-600 dark:text-slate-300 capitalize leading-none">
            {data.weather[0].description}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10">
        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Thermometer className="w-5 h-5 text-rose-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('feelsLike')}</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{formatTemperature(data.main.feels_like, unit)}</span>
        </div>
        
        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('humidity')}</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{data.main.humidity}%</span>
        </div>

        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Wind className="w-5 h-5 text-teal-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('wind')}</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{windSpeed} <span className="text-base font-medium text-slate-500">{windUnit}</span></span>
        </div>

        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Gauge className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('pressure')}</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{data.main.pressure} <span className="text-base font-medium text-slate-500">hPa</span></span>
        </div>

        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Eye className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('visibility')}</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{(data.visibility / 1000).toFixed(1)} <span className="text-base font-medium text-slate-500">km</span></span>
        </div>

        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
            <Sunrise className="w-5 h-5 text-orange-400" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('sunrise')}</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{formatTime(data.sys.sunrise, data.timezone, language)}</span>
        </div>

        <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm col-span-2">
          <div className="flex items-center justify-center gap-4 text-slate-500 dark:text-slate-400 mb-1">
            <Sunset className="w-6 h-6 text-orange-600" />
            <span className="font-semibold text-sm uppercase tracking-wider">{t('sunset')}</span>
          </div>
          <span className="block text-center text-3xl font-bold text-slate-800 dark:text-slate-100">{formatTime(data.sys.sunset, data.timezone, language)}</span>
        </div>
      </div>
    </div>
  );
}
