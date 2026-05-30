import { useState, useEffect, useRef, useContext } from 'react';
import { Search, MapPin, Loader2, Mic } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { fetchCitySuggestions } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import { PreferencesContext } from '../context/PreferencesContext';

export default function SearchBar({ onSearch, onLocation, isLocating }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const wrapperRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);
  const { t } = useTranslation();
  const { language } = useContext(PreferencesContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.trim().length >= 2) {
        setIsSearching(true);
        const results = await fetchCitySuggestions(debouncedQuery, language);
        setSuggestions(results);
        setIsDropdownOpen(true);
        setIsSearching(false);
      } else {
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    };
    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsDropdownOpen(false);
      setQuery('');
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const searchString = `${suggestion.name}, ${suggestion.country}`;
    setQuery('');
    setIsDropdownOpen(false);
    onSearch(searchString);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support voice search.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
      setIsDropdownOpen(false);
      setQuery('');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto flex items-center gap-3 z-50">
      <form onSubmit={handleSubmit} className="relative flex-1 group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setIsDropdownOpen(true); }}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-14 pr-16 py-4 text-lg rounded-2xl glass-panel focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 placeholder-slate-500 dark:placeholder-slate-400 transition-all shadow-md group-focus-within:shadow-xl group-focus-within:bg-white/80 dark:group-focus-within:bg-slate-800/80"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isSearching && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
          <button
            type="button"
            onClick={startVoiceSearch}
            className={`p-1.5 rounded-full transition-colors ${
              isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-500/10'
            }`}
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {isDropdownOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 py-2 glass-panel shadow-2xl overflow-hidden rounded-xl animate-fade-in">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(s)}
                className="w-full px-5 py-3 text-left hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex flex-col items-start gap-1"
              >
                <span className="text-slate-800 dark:text-slate-100 font-semibold text-lg">{s.name}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {s.state ? `${s.state}, ` : ''}{s.country}
                </span>
              </button>
            ))}
          </div>
        )}
      </form>
      
      <button
        type="button"
        onClick={onLocation}
        disabled={isLocating}
        className="p-4 rounded-2xl glass-panel hover:bg-white/70 dark:hover:bg-slate-700/80 transition-all shadow-md hover:shadow-lg flex-shrink-0 active:scale-95"
        title="Use My Location"
      >
        {isLocating ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <MapPin className="w-6 h-6 text-blue-500" />}
      </button>
    </div>
  );
}


