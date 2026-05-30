import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset, Sun, CloudFog } from 'lucide-react';
import { formatTime } from '../utils/format';
import { useContext } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';
import { useTranslation } from '../hooks/useTranslation';

const DetailCard = ({ icon: Icon, label, value }) => (
  <div className="glass-panel p-5 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 cursor-default">
    <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 rounded-2xl text-blue-600 dark:text-blue-400 shadow-inner">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  </div>
);

export default function WeatherDetails({ data }) {
  const { unit, language } = useContext(PreferencesContext);
  const { t } = useTranslation();

  if (!data) return null;

  const { main, wind, visibility, sys, timezone } = data.current;
  const aqi = data.aqi;
  const uvi = data.uvi;

  const windSpeed = unit === 'imperial' ? (wind.speed * 2.23694).toFixed(1) : wind.speed;
  const windUnit = unit === 'imperial' ? 'mph' : 'm/s';

  const details = [
    { icon: Droplets, label: t('humidity'), value: `${main.humidity}%` },
    { icon: Wind, label: t('wind'), value: `${windSpeed} ${windUnit}` },
    { icon: Gauge, label: t('pressure'), value: `${main.pressure} hPa` },
    { icon: Eye, label: t('visibility'), value: `${(visibility / 1000).toFixed(1)} km` },
    { icon: Sunrise, label: t('sunrise'), value: formatTime(sys.sunrise, timezone, language) },
    { icon: Sunset, label: t('sunset'), value: formatTime(sys.sunset, timezone, language) },
  ];

  if (aqi) {
    const aqiMap = { 1: t('good'), 2: t('fair'), 3: t('moderate'), 4: t('poor'), 5: t('veryPoor') };
    details.push({ icon: CloudFog, label: t('aqi'), value: `${aqi.main.aqi} - ${aqiMap[aqi.main.aqi] || ''}` });
  }

  if (uvi !== null && uvi !== undefined) {
    details.push({ icon: Sun, label: t('uvIndex'), value: uvi });
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {details.map((detail, index) => (
        <DetailCard key={index} {...detail} />
      ))}
    </div>
  );
}
