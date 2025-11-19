import React, { useState } from 'react';
import { FilterState, Restaurant } from '../types';
import RestaurantListModal from './RestaurantListModal';

interface Props {
  allCategories: string[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
  totalCount: number;
  allRestaurants: Restaurant[]; // Added for modal
}

const FilterPanel: React.FC<Props> = ({ allCategories, filters, setFilters, resultCount, totalCount, allRestaurants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleCategory = (cat: string) => {
    setFilters(prev => {
      const exists = prev.categories.includes(cat);
      const newCats = exists 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: newCats };
    });
  };

  const toggleFilter = (key: keyof Omit<FilterState, 'categories' | 'excludedIds'>) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExclusion = (id: string) => {
    setFilters(prev => {
      const isExcluded = prev.excludedIds.includes(id);
      const newExcluded = isExcluded
        ? prev.excludedIds.filter(e => e !== id)
        : [...prev.excludedIds, id];
      return { ...prev, excludedIds: newExcluded };
    });
  };

  const selectAll = () => setFilters(prev => ({ ...prev, categories: allCategories }));
  const clearAll = () => setFilters(prev => ({ ...prev, categories: [] }));

  return (
    <>
      <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden">
        
        {/* Decorative background blob */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-slo-teal/5 rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-serif text-slo-blue mb-1">Preferences</h2>
              <p className="text-gray-500 text-sm font-medium">
                Showing <span className="text-slo-teal font-bold">{resultCount}</span> of {totalCount} places
              </p>
            </div>
            
            {/* Show All Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 bg-slo-blue text-white text-xs font-bold rounded-lg shadow-sm hover:bg-blue-900 transition-colors"
            >
              Show All
            </button>
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-8">
             <div 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group" 
                onClick={() => toggleFilter('openNow')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleFilter('openNow')}
             >
                <span className="font-semibold text-gray-700 group-hover:text-slo-teal transition-colors">Open Now</span>
                <div className={`w-12 h-7 rounded-full p-1 transition-colors ${filters.openNow ? 'bg-slo-teal' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${filters.openNow ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
             </div>

             <div 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group" 
                onClick={() => toggleFilter('useRatingWeight')}
                role="button"
                tabIndex={0}
             >
                <span className="font-semibold text-gray-700 group-hover:text-slo-coral transition-colors">Weighted Spin</span>
                <div className={`w-12 h-7 rounded-full p-1 transition-colors ${filters.useRatingWeight ? 'bg-slo-coral' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${filters.useRatingWeight ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
             </div>

             {/* Changed to Navy Blue (slo-blue) for ADA compliance */}
             <div 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group" 
                onClick={() => toggleFilter('cheapEatsOnly')}
                role="button"
                tabIndex={0}
             >
                <span className="font-semibold text-gray-700 group-hover:text-slo-blue transition-colors">Cheap Eats ($)</span>
                <div className={`w-12 h-7 rounded-full p-1 transition-colors ${filters.cheapEatsOnly ? 'bg-slo-blue' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${filters.cheapEatsOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
             </div>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-xl text-slo-blue">Cravings</h3>
            <div className="flex space-x-2">
              <button 
                onClick={selectAll} 
                className="px-3 py-1 rounded-md bg-slo-teal/10 text-slo-teal text-xs font-bold hover:bg-slo-teal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slo-teal focus:ring-offset-1"
                aria-label="Select all categories"
              >
                ALL
              </button>
              <button 
                onClick={clearAll} 
                className="px-3 py-1 rounded-md bg-slo-coral/10 text-slo-coral text-xs font-bold hover:bg-slo-coral hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slo-coral focus:ring-offset-1"
                aria-label="Clear all categories"
              >
                NONE
              </button>
            </div>
          </div>

          {/* Added p-1 to prevent focus ring clipping */}
          <div className="flex flex-wrap gap-2 content-start overflow-y-auto flex-grow pr-2 custom-scrollbar pb-2 p-1 -m-1">
            {allCategories.map(cat => {
              const active = filters.categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-bold transition-all
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${active 
                      ? 'bg-slo-blue text-white shadow-md shadow-blue-900/10 transform scale-100 focus:ring-slo-blue' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-gray-400'
                    }
                  `}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* AdSense / Placeholder Area */}
          <div className="mt-auto pt-6">
             <div className="w-full h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                <span className="text-xs font-bold uppercase tracking-widest mb-1">Sponsored</span>
                <span className="text-xs">Ad Space</span>
             </div>
          </div>
        </div>
      </div>

      <RestaurantListModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        restaurants={allRestaurants}
        excludedIds={filters.excludedIds}
        onToggleExclusion={toggleExclusion}
      />
    </>
  );
};

export default FilterPanel;