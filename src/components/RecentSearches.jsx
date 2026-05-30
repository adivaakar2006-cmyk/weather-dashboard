import { Clock, X } from 'lucide-react';

export default function RecentSearches({ searches, onSelect, onClear }) {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium mr-1">
        <Clock className="w-4 h-4" />
        <span className="hidden sm:inline">Recent Searches:</span>
      </div>
      {searches.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="px-3 py-1.5 text-sm bg-white/40 hover:bg-white/80 dark:bg-slate-800/40 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 rounded-full transition-all border border-white/40 dark:border-slate-700/50 shadow-sm"
        >
          {city}
        </button>
      ))}
      <button 
        onClick={onClear}
        className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white/50 dark:hover:bg-slate-800 transition-all ml-1"
        title="Clear history"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
