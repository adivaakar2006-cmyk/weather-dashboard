import { useContext } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PreferencesContext } from '../context/PreferencesContext';
import { useTranslation } from '../hooks/useTranslation';

export default function WeeklyChart({ forecastData }) {
  const { unit, language } = useContext(PreferencesContext);
  const { t } = useTranslation();

  if (!forecastData) return null;

  const dailyData = {};
  forecastData.list.forEach((item) => {
    const dateObj = new Date(item.dt * 1000);
    const date = dateObj.toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        dateObj,
        temp_max: item.main.temp_max,
        pop: item.pop || 0,
      };
    } else {
      dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
      dailyData[date].pop = Math.max(dailyData[date].pop, item.pop || 0);
    }
  });

  const next5Days = Object.values(dailyData).slice(0, 5).map(day => ({
    name: new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language, { weekday: 'short' }).format(day.dateObj),
    temp: Math.round(unit === 'imperial' ? (day.temp_max * 9) / 5 + 32 : day.temp_max),
    rain: Math.round(day.pop * 100),
  }));

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('fiveDayForecast')} - Graph</h3>
      <div className="w-full min-h-[300px]" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <ComposedChart data={next5Days} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}°`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar yAxisId="right" dataKey="rain" name="Rain Prob (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
            <Line yAxisId="left" type="monotone" dataKey="temp" name="Max Temp" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
