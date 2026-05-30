export function CurrentWeatherSkeleton() {
  return (
    <div className="glass-panel p-8 flex flex-col items-center text-center animate-pulse">
      <div className="w-32 h-6 bg-slate-300 dark:bg-slate-700 rounded-full mb-2"></div>
      
      <div className="flex items-center justify-center gap-4 my-6">
        <div className="w-36 h-36 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        <div className="w-24 h-16 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
      </div>
      
      <div className="w-48 h-8 bg-slate-300 dark:bg-slate-700 rounded-full mb-6"></div>
      <div className="w-40 h-8 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
    </div>
  );
}

export function WeatherDetailsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass-panel p-5 flex items-center gap-4 animate-pulse">
          <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
          <div className="flex flex-col gap-2">
            <div className="w-16 h-4 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-20 h-6 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HourlyChartSkeleton() {
  return (
    <div className="glass-panel p-6 animate-pulse">
      <div className="w-40 h-6 bg-slate-300 dark:bg-slate-700 rounded-full mb-6"></div>
      <div className="h-64 w-full bg-slate-300/50 dark:bg-slate-700/50 rounded-xl"></div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="glass-panel p-6 animate-pulse">
      <div className="w-40 h-6 bg-slate-300 dark:bg-slate-700 rounded-full mb-4"></div>
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-16 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export function WeeklyChartSkeleton() {
  return (
    <div className="glass-panel p-6 animate-pulse">
      <div className="w-48 h-6 bg-slate-300 dark:bg-slate-700 rounded-full mb-6"></div>
      <div className="h-[300px] w-full bg-slate-300/50 dark:bg-slate-700/50 rounded-xl"></div>
    </div>
  );
}
