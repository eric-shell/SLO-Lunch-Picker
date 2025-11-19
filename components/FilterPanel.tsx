import React from 'react';
import { FilterState } from '../types';

interface Props {
  allCategories: string[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
  totalCount: number;
}

const FilterPanel: React.FC<Props> = ({ allCategories, filters, setFilters, resultCount, totalCount }) => {
  
  const toggleCategory = (cat: string) => {
    setFilters(prev => {
      const exists = prev.categories.includes(cat);
      const newCats = exists 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: newCats };
    });
  };

  const toggleFilter = (key: keyof Omit<FilterState, 'categories'>) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => setFilters(prev => ({ ...prev, categories: allCategories }));
  const clearAll = () => setFilters(prev => ({ ...prev, categories: [] }));

  return (
    <div className="relative">
      {/* Wood Frame */}
      <div className="bg-wood-light p-3 rounded-lg shadow-2xl border-2 border-wood-dark">
        
        {/* Corkboard Surface */}
        <div className="cork-texture rounded p-6">
          
          {/* Header "Pinned" Note */}
          <div className="bg-yellow-100 p-4 shadow-md transform -rotate-1 mb-6 relative font-hand text-xl text-gray-800 text-center border border-yellow-200">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800"></div>
             <h3 className="font-bold text-2xl mb-1">Preferences</h3>
             <span className="block text-sm text-gray-600 font-sans">
               Finding {resultCount} of {totalCount} spots
             </span>
          </div>

          {/* Game Rules / Boolean Toggles */}
          <div className="mb-6 space-y-3">
            <h4 className="font-hand text-2xl text-wood-dark font-bold mb-2 border-b border-wood-dark/20 pb-1">House Rules</h4>
            
            <label className="flex items-center cursor-pointer select-none bg-white/80 p-2 rounded shadow-sm">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.openNow} 
                  onChange={() => toggleFilter('openNow')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.openNow ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.openNow ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-gray-800 font-sans font-semibold text-sm">
                Open Now Only
              </div>
            </label>

            <label className="flex items-center cursor-pointer select-none bg-white/80 p-2 rounded shadow-sm">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.useRatingWeight} 
                  onChange={() => toggleFilter('useRatingWeight')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.useRatingWeight ? 'bg-dart-red' : 'bg-gray-400'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.useRatingWeight ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-gray-800 font-sans font-semibold text-sm">
                Weighted Spin (By Rating)
              </div>
            </label>

             <label className="flex items-center cursor-pointer select-none bg-white/80 p-2 rounded shadow-sm">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.cheapEatsOnly} 
                  onChange={() => toggleFilter('cheapEatsOnly')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.cheapEatsOnly ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.cheapEatsOnly ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-gray-800 font-sans font-semibold text-sm">
                Cheap Eats Only ($)
              </div>
            </label>
          </div>

          {/* Categories Header */}
          <div className="mb-3">
            <h4 className="font-hand text-3xl text-wood-dark font-bold text-center">I'm in the mood for...</h4>
            <div className="flex justify-between text-xs text-wood-dark font-sans mt-1 px-2">
              <button onClick={selectAll} className="underline hover:text-blue-600 font-bold">All</button>
              <button onClick={clearAll} className="underline hover:text-red-600 font-bold">None</button>
            </div>
          </div>
          
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat, idx) => {
              const active = filters.categories.includes(cat);
              // Rotate slightly for messy look
              const rot = (idx % 3 === 0 ? 'rotate-1' : (idx % 2 === 0 ? '-rotate-1' : 'rotate-0'));
              
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`
                    font-hand text-lg py-1 px-3 shadow-sm border transition-all transform ${rot}
                    ${active 
                      ? 'bg-white text-black border-gray-400 hover:scale-105 shadow-md' 
                      : 'bg-gray-300 text-gray-500 border-transparent opacity-70 hover:opacity-100'
                    }
                  `}
                  style={{
                    // Mimic Post-it colors if active
                    backgroundColor: active ? (idx % 2 === 0 ? '#fffdc2' : '#d8f5ff') : undefined
                  }}
                >
                  {/* Pin graphic */}
                  <span className={`block w-2 h-2 rounded-full mx-auto mb-1 ${active ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterPanel;