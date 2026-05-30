import { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { PreferencesContext } from '../context/PreferencesContext';
import { useTranslation } from '../hooks/useTranslation';

export default function HourlyChart({ forecastData }) {
  const { unit } = useContext(PreferencesContext);
  const { t } = useTranslation();

  if (!forecastData) return null;

  // Extract the next 8 periods (24 hours, since each period is 3 hours)
  const data = forecastData.list.slice(0, 8).map(item => {
    let temp = item.main.temp;
    if (unit === 'imperial') {
      temp = (temp * 9) / 5 + 32;
    }
    return {
      time: format(new Date(item.dt * 1000), 'HH:mm'),
      temp: Math.round(temp),
    };
  });

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('hourlyForecast')}</h3>
      <div className="w-full min-h-[250px]" style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}°`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
