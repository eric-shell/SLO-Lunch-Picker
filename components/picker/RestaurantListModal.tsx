import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Restaurant } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  excludedIds: string[];
  onToggleExclusion: (id: string) => void;
}

type SortField = 'NAME' | 'RATING';
type SortDirection = 'ASC' | 'DESC';

interface SortState {
  field: SortField;
  direction: SortDirection;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('bakery') || cat.includes('donut')) return '🍞';
  if (cat.includes('seafood')) return '🐟';
  if (cat.includes('sandwich') || cat.includes('deli')) return '🥪';
  if (cat.includes('bbq') || cat.includes('barbecue')) return '🍖';
  if (cat.includes('pizza')) return '🍕';
  if (cat.includes('mexican') || cat.includes('taco')) return '🌮';
  if (cat.includes('asian') || cat.includes('japanese') || cat.includes('sushi')) return '🍜';
  if (cat.includes('burger') || cat.includes('american')) return '🍔';
  if (cat.includes('mediterranean')) return '🥙';
  if (cat.includes('coffee') || cat.includes('cafe')) return '☕';
  return '🍽️';
};

const RestaurantListModal: React.FC<Props> = ({ isOpen, onClose, restaurants, excludedIds, onToggleExclusion }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortState, setSortState] = useState<SortState>({ field: 'NAME', direction: 'ASC' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allCategories = useMemo(() => {
    return Array.from(new Set(restaurants.flatMap(r => r.categories))).sort();
  }, [restaurants]);

  const filteredAndSortedRestaurants = useMemo(() => {
    let result = restaurants;

    // Filter by selected categories (if any selected)
    if (selectedCategories.length > 0) {
      result = result.filter(r => r.categories.some(c => selectedCategories.includes(c)));
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortState.field === 'NAME') {
        return sortState.direction === 'ASC' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortState.direction === 'ASC'
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
    });

    return result;
  }, [restaurants, selectedCategories, sortState]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSortClick = (field: SortField) => {
    setSortState(prev => {
      if (prev.field === field) {
        // Toggle direction
        return { ...prev, direction: prev.direction === 'ASC' ? 'DESC' : 'ASC' };
      }
      // New field, default direction
      return { field, direction: field === 'RATING' ? 'DESC' : 'ASC' };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal Content - Added h-[70vh] for fixed height stability */}
      <div className="bg-white rounded-3xl w-full max-w-3xl h-[70vh] flex flex-col shadow-2xl relative z-10 overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-white space-y-4 relative z-20 flex-shrink-0">
          <div className="flex justify-between items-top">
            <div>
              <h2 className="text-2xl font-serif text-slo-blue">All Restaurants</h2>
              <p className="text-sm text-gray-500">Manage which options are included in your spin.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slo-blue hover:bg-sky-950 text-white flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-row justify-between items-center w-full gap-4">
             
             {/* Category Dropdown (Left) */}
             <div className="relative" ref={dropdownRef}>
                <button 
                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                   className={`
                     flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer
                     ${isDropdownOpen 
                       ? 'bg-slo-blue text-white border-slo-blue ring-2 ring-blue-100' 
                       : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                   `}
                >
                   <span>
                     {selectedCategories.length === 0 ? 'Filter Categories' : `${selectedCategories.length} Selected`}
                   </span>
                   <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                   <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 max-h-64 overflow-y-auto custom-scrollbar animate-fade-in">
                      <div className="mb-2 pb-2 border-b border-gray-100">
                        <button
                           onClick={() => { setSelectedCategories([]); setIsDropdownOpen(false); }}
                           className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-slo-blue transition-colors uppercase tracking-wide cursor-pointer"
                        >
                          Reset Filter
                        </button>
                      </div>
                      {allCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`
                            w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-colors mb-1 cursor-pointer
                            ${selectedCategories.includes(cat) 
                               ? 'bg-slo-teal/10 text-slo-teal' 
                               : 'text-gray-600 hover:bg-gray-50'}
                          `}
                        >
                          <span>{cat}</span>
                          {selectedCategories.includes(cat) && (
                            <span className="text-slo-teal">✓</span>
                          )}
                        </button>
                      ))}
                   </div>
                )}
             </div>

             {/* Sort Options (Right) */}
             <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => handleSortClick('NAME')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${sortState.field === 'NAME' ? 'bg-white shadow text-slo-blue' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Name {sortState.field === 'NAME' && (sortState.direction === 'ASC' ? '↑' : '↓')}
                </button>
                <button 
                  onClick={() => handleSortClick('RATING')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${sortState.field === 'RATING' ? 'bg-white shadow text-slo-coral' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Rating {sortState.field === 'RATING' && (sortState.direction === 'ASC' ? '↑' : '↓')}
                </button>
             </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-gray-50/50">
          <div className="grid gap-3">
            {filteredAndSortedRestaurants.map(r => {
              const isIncluded = !excludedIds.includes(r.id);
              return (
                <div 
                  key={r.id} 
                  className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all
                    ${isIncluded ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0
                        ${isIncluded ? 'bg-slo-sand' : 'bg-gray-200 grayscale'}
                      `}
                    >
                      {getCategoryIcon(r.categories[0])}
                    </div>
                    <div>
                      <h3 className={`font-bold ${isIncluded ? 'text-gray-800' : 'text-gray-400'}`}>{r.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 rounded bg-gray-100">{r.categories.join(', ')}</span>
                        <span>•</span>
                        <span className="text-slo-yellow font-bold">★ {r.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleExclusion(r.id)}
                    className={`
                      relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slo-teal focus:ring-offset-2 cursor-pointer
                      ${isIncluded ? 'bg-slo-teal' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${isIncluded ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              );
            })}

            {filteredAndSortedRestaurants.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    No restaurants match selected filters.
                </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 pt-6 border-t border-gray-100 bg-white flex justify-end relative z-20 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slo-blue text-white rounded-xl font-bold hover:bg-sky-950 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListModal;

