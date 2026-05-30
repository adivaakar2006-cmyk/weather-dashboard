import { Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(PreferencesContext);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-2xl glass-panel hover:bg-white/70 dark:hover:bg-slate-700/80 transition-all shadow-sm hover:shadow active:scale-95 text-slate-700 dark:text-slate-200"
      title="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}
