import { useContext, useState } from 'react';
import { format } from 'date-fns';
import { formatTemperature } from '../utils/format';
import { PreferencesContext } from '../context/PreferencesContext';
import { useTranslation } from '../hooks/useTranslation';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind, Sunrise, Sunset, Sun, ChevronDown } from 'lucide-react';

export default function Forecast({ forecastData, dailyDetails }) {
  const { unit, language } = useContext(PreferencesContext);
  const { t } = useTranslation();
  const [expandedDay, setExpandedDay] = useState(0);

  if (!forecastData) return null;

  const dailyData = {};
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        date: item.dt,
        humiditySum: item.main.humidity,
        windSum: item.wind.speed,
        count: 1
      };
    } else {
      dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
      dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
      dailyData[date].humiditySum += item.main.humidity;
      dailyData[date].windSum += item.wind.speed;
      dailyData[date].count += 1;
    }
  });

  const next5Days = Object.values(dailyData).slice(0, 5);

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('fiveDayForecast')} - Details</h3>
      <div className="flex flex-col">
        {next5Days.map((day, index) => {
          const avgHumidity = Math.round(day.humiditySum / day.count);
          const avgWind = (day.windSum / day.count).toFixed(1);
          const windSpeed = unit === 'imperial' ? (avgWind * 2.23694).toFixed(1) : avgWind;
          const windUnit = unit === 'imperial' ? 'mph' : 'm/s';
          
          const timeFormatter = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language, { hour: '2-digit', minute: '2-digit' });
          const sunrise = dailyDetails?.sunrise?.[index] ? timeFormatter.format(new Date(dailyDetails.sunrise[index])) : '--:--';
          const sunset = dailyDetails?.sunset?.[index] ? timeFormatter.format(new Date(dailyDetails.sunset[index])) : '--:--';
          const uvMax = dailyDetails?.uv_index_max?.[index] ?? '--';

          const isExpanded = expandedDay === index;
          
          const formatter = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language, { weekday: 'short', month: 'short', day: 'numeric' });
          const dateStr = index === 0 ? t('today') : formatter.format(new Date(day.date * 1000));

          return (
            <div key={day.date} className="flex flex-col border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 overflow-hidden">
              <div 
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-white/20 dark:hover:bg-black/10 rounded-lg px-2 transition-colors"
                onClick={() => toggleDay(index)}
              >
                <span className="w-28 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                  {dateStr}
                </span>
                
                <div className="flex items-center gap-3 flex-1 justify-center">
                  <WeatherIcon 
                    code={day.icon}
                    className="w-10 h-10"
                  />
                  <span className="text-sm capitalize hidden sm:inline-block text-slate-500 dark:text-slate-400 w-24 truncate">
                    {day.description}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 w-auto justify-end font-semibold">
                  <span className="text-slate-800 dark:text-slate-100">{formatTemperature(day.temp_max, unit)}</span>
                  <span className="text-slate-400 dark:text-slate-500">{formatTemperature(day.temp_min, unit)}</span>
                  <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Accordion Details */}
              <div 
                className={`grid grid-cols-2 sm:grid-cols-5 gap-4 px-4 transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>{avgHumidity}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Wind className="w-4 h-4 text-teal-500" />
                  <span>{windSpeed} {windUnit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>UV: {uvMax}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Sunrise className="w-4 h-4 text-orange-400" />
                  <span>{sunrise}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Sunset className="w-4 h-4 text-rose-400" />
                  <span>{sunset}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
