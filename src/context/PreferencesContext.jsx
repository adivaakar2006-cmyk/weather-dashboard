import { createContext, useState, useEffect } from 'react';

export const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('weather-theme');
    if (saved) return JSON.parse(saved);
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [unit, setUnit] = useState(() => {
    const saved = localStorage.getItem('weather-unit');
    return saved ? JSON.parse(saved) : 'metric';
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('weather-language');
    return saved ? JSON.parse(saved) : 'en';
  });

  useEffect(() => {
    localStorage.setItem('weather-theme', JSON.stringify(theme));
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('weather-unit', JSON.stringify(unit));
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('weather-language', JSON.stringify(language));
  }, [language]);

  return (
    <PreferencesContext.Provider value={{ theme, setTheme, unit, setUnit, language, setLanguage }}>
      {children}
    </PreferencesContext.Provider>
  );
}
