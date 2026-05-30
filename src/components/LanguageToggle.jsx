import { useContext } from 'react';
import { Globe } from 'lucide-react';
import { PreferencesContext } from '../context/PreferencesContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useContext(PreferencesContext);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'hi', label: 'HI' },
    { code: 'ja', label: 'JA' },
  ];

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-800/40 px-3 py-2 rounded-2xl backdrop-blur-md shadow-sm border border-white/40 dark:border-white/10 cursor-pointer hover:bg-white/70 dark:hover:bg-slate-700/80 transition-all">
        <Globe className="w-5 h-5 text-blue-500" />
        <span className="font-bold text-slate-700 dark:text-slate-200 uppercase">{language}</span>
      </div>
      
      <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="flex flex-col bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/40 dark:border-slate-700/50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-6 py-2.5 text-left font-semibold transition-colors hover:bg-blue-50 dark:hover:bg-slate-700/50 ${
                language === lang.code ? 'text-blue-500 bg-blue-50/50 dark:bg-slate-700/30' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
