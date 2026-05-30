import { Star, X } from 'lucide-react';

export default function Favorites({ favorites, onSelect, onRemove, onAdd, currentCity }) {
  const isFavorite = currentCity && favorites.includes(currentCity);

  return (
    <div className="w-full mb-8 flex flex-col gap-6 animate-[fade-in_0.5s_ease-out]">
      {currentCity && (
        <button
          onClick={() => isFavorite ? onRemove(currentCity) : onAdd(currentCity)}
          className={`self-center flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 ${
            isFavorite 
              ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400/30' 
              : 'glass hover:bg-white/40 dark:hover:bg-white/10'
          }`}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
        </button>
      )}

      {favorites.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center">
          {favorites.map((city) => (
            <div key={city} className="flex items-center glass-panel rounded-full pl-5 pr-2 py-2 group hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
              <button 
                onClick={() => onSelect(city)}
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {city}
              </button>
              <button 
                onClick={() => onRemove(city)}
                className="p-1.5 ml-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
                aria-label={`Remove ${city} from favorites`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
