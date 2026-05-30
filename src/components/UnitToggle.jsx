import { useContext } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';

export default function UnitToggle() {
  const { unit, setUnit } = useContext(PreferencesContext);

  return (
    <div className="flex bg-white/40 dark:bg-slate-800/40 p-1 rounded-2xl backdrop-blur-md shadow-sm border border-white/40 dark:border-white/10">
      <button
        onClick={() => setUnit('metric')}
        className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
          unit === 'metric'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('imperial')}
        className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
          unit === 'imperial'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        °F
      </button>
    </div>
  );
}
