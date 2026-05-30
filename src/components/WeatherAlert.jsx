import { AlertTriangle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function WeatherAlert({ data }) {
  const { t } = useTranslation();

  if (!data || !data.weather || data.weather.length === 0) return null;

  const conditionId = data.weather[0].id;
  const temp = data.main?.temp;
  const windSpeed = data.wind?.speed; // in m/s (metric) or mph (imperial)
  
  // Severe Weather Triggers:
  // 1. Thunderstorms (200-232)
  // 2. Extreme Rain/Squalls/Tornado (504, 771, 781)
  // 3. Extreme Heat (> 40°C or > 104°F)
  // 4. Hurricane-force winds (> 33 m/s or > 74 mph)
  
  let isSevere = false;
  let severity = 'warning'; // 'warning' or 'danger'
  
  if (conditionId >= 200 && conditionId <= 232) {
    isSevere = true;
    severity = 'danger';
  } else if (conditionId === 771 || conditionId === 781 || conditionId === 504) {
    isSevere = true;
    severity = 'danger';
  } else if (temp > 40 || temp > 104) {
    isSevere = true;
    severity = 'warning';
  } else if (windSpeed > 33 || windSpeed > 74) {
    isSevere = true;
    severity = 'danger';
  }

  if (!isSevere) return null;

  return (
    <div className={`p-4 rounded-2xl backdrop-blur-md border shadow-lg flex items-center gap-4 animate-[fade-in_0.5s_ease-out] ${
      severity === 'danger' 
        ? 'bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-200'
        : 'bg-orange-500/20 border-orange-500/30 text-orange-800 dark:text-orange-200'
    }`}>
      <AlertTriangle className={`w-8 h-8 flex-shrink-0 ${severity === 'danger' ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-orange-600 dark:text-orange-400'}`} />
      <div>
        <h3 className="font-bold text-lg">{t('weatherAlert')}</h3>
        <p className="opacity-90 capitalize font-medium">{data.weather[0].description}</p>
      </div>
    </div>
  );
}
