import React, { useState } from 'react';
import { FilterState, Restaurant } from '../../types';
import RestaurantListModal from './RestaurantListModal';
import Tooltip from '../ui/Tooltip';
import { trackEvent, GA_CATEGORIES, GA_ACTIONS } from '../../utils/analytics';

interface Props {
  allCategories: string[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
  totalCount: number;
  allRestaurants: Restaurant[];
  themeGradient?: string;
}

const FilterPanel: React.FC<Props> = ({ 
  allCategories, 
  filters, 
  setFilters, 
  resultCount, 
  totalCount, 
  allRestaurants,
  themeGradient = 'from-slo-teal to-slo-yellow' // Default fallback
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleCategory = (cat: string) => {
    setFilters(prev => {
      const exists = prev.categories.includes(cat);
      const newCats = exists 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat];
      
      trackEvent(GA_ACTIONS.TOGGLE_CATEGORY, GA_CATEGORIES.FILTER, cat, exists ? 0 : 1);
      return { ...prev, categories: newCats };
    });
  };

  const toggleFilter = (key: keyof Omit<FilterState, 'categories' | 'excludedIds'>) => {
    setFilters(prev => {
      const newValue = !prev[key];
      trackEvent(GA_ACTIONS.TOGGLE_FILTER, GA_CATEGORIES.FILTER, key, newValue ? 1 : 0);
      return { ...prev, [key]: newValue };
    });
  };

  const toggleExclusion = (id: string) => {
    setFilters(prev => {
      const isExcluded = prev.excludedIds.includes(id);
      const newExcluded = isExcluded
        ? prev.excludedIds.filter(e => e !== id)
        : [...prev.excludedIds, id];
      
      trackEvent(GA_ACTIONS.EXCLUDE_RESTAURANT, GA_CATEGORIES.FILTER, id, isExcluded ? 0 : 1);
      return { ...prev, excludedIds: newExcluded };
    });
  };

  const selectAll = () => {
    trackEvent(GA_ACTIONS.TOGGLE_CATEGORY, GA_CATEGORIES.FILTER, 'SELECT_ALL');
    setFilters(prev => ({ ...prev, categories: allCategories }));
  };
  const clearAll = () => {
    trackEvent(GA_ACTIONS.TOGGLE_CATEGORY, GA_CATEGORIES.FILTER, 'CLEAR_ALL');
    setFilters(prev => ({ ...prev, categories: [] }));
  };

  return (
    <>
      <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col relative transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-auto'} lg:h-full`}>
        
        {/* Decorative Gradient Border */}
        <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${themeGradient} z-20 rounded-t-3xl`}></div>

        <div className="relative z-10 flex flex-col h-full">
          <div 
            className="lg:mb-6 flex items-start justify-between lg:pt-2 cursor-pointer lg:cursor-default"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              {/* Chevron for mobile */}
              <div className={`w-8 h-8 mr-3 rounded-full bg-slo-blue flex items-center justify-center lg:hidden transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif text-slo-blue pb-1">Preferences</h2>
                <p className="text-gray-500 text-sm font-medium">
                  Showing <span className="text-slo-teal font-bold">{resultCount}</span> of {totalCount} places
                </p>
              </div>
            </div>
            
            {/* All Restaurants Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                trackEvent(GA_ACTIONS.SHOW_FULL_LIST, GA_CATEGORIES.INTERACTION);
              }}
              className="px-3 py-1.5 bg-slo-blue text-white text-xs font-bold rounded-lg shadow-sm hover:bg-sky-950 transition-colors cursor-pointer"
            >
              All Restaurants
            </button>
          </div>

          {/* Collapsible Content Wrapper */}
          <div className={`${isExpanded ? 'block' : 'hidden'} lg:block lg:flex-grow lg:flex lg:flex-col lg:min-h-0`}>
            
            {/* Scrollable Content Area - includes filters AND cravings */}
            {/* px-1 for focus ring/shadow space, pr-2 extra for scrollbar */}
            <div className="lg:flex-grow lg:overflow-y-auto lg:min-h-0 custom-scrollbar px-1 pb-1 mr-1">
              <div>
                {/* Filters */}
                <div className="space-y-3 mb-8 mt-4 lg:mt-0">
                 {/* Open Now */}
                 <div 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group" 
                    onClick={() => toggleFilter('openNow')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleFilter('openNow')}
                 >
                   {/* <Tooltip content="Based on known hours" position="top"> */}
                      <span className="font-semibold text-gray-700 group-hover:text-sky-950 transition-colors">Open Now</span>
                   {/* </Tooltip> */}
                    <div className={`w-12 h-7 rounded-full p-1 transition-colors ${filters.openNow ? 'bg-slo-teal' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${filters.openNow ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                 </div>

                 {/* Rating Adjusted */}
                 <div 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group" 
                    onClick={() => toggleFilter('useRatingWeight')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleFilter('useRatingWeight')}
                 >
                   {/* <Tooltip content="Changes probability based on last known ratings" position="top"> */}
                      <span className="font-semibold text-gray-700 group-hover:text-sky-950 transition-colors">Rating Adjusted</span>
                   {/* </Tooltip> */}
                    <div className={`w-12 h-7 rounded-full p-1 transition-colors ${filters.useRatingWeight ? 'bg-slo-coral' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${filters.useRatingWeight ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                 </div>

                 {/* Cheap Meals */}
                 <div 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group" 
                    onClick={() => toggleFilter('cheapMealsOnly')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleFilter('cheapMealsOnly')}
                 >
                   {/* <Tooltip content="This is for $ restaurants" position="top"> */}
                      <span className="font-semibold text-gray-700 group-hover:text-sky-950 transition-colors">Cheap Meals</span>
                   {/* </Tooltip> */}
                    <div className={`w-12 h-7 rounded-full p-1 transition-colors ${filters.cheapMealsOnly ? 'bg-slo-sky' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${filters.cheapMealsOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                 </div>
              </div>

              {/* Categories */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-slo-blue">Cravings</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={selectAll} 
                    className="px-3 py-1 rounded-md bg-slo-teal/10 text-slo-teal text-xs font-bold hover:bg-slo-teal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slo-teal focus:ring-offset-1 cursor-pointer"
                    aria-label="Select all categories"
                  >
                    ALL
                  </button>
                  <button 
                    onClick={clearAll} 
                    className="px-3 py-1 rounded-md bg-slo-coral/10 text-slo-coral text-xs font-bold hover:bg-slo-coral hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slo-coral focus:ring-offset-1 cursor-pointer"
                    aria-label="Clear all categories"
                  >
                    NONE
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 content-start pb-1">
                {allCategories.map(cat => {
                  const active = filters.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-bold transition-all
                        focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer
                        ${active 
                          ? 'bg-slo-blue text-white shadow-md shadow-blue-900/10 transform scale-100 focus:ring-slo-blue hover:bg-sky-950' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-gray-400 cursor-pointer'
                        }
                      `}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
              </div>
            </div>

            {/* AdSense / Placeholder Area - stays fixed at bottom */}
            <div className="flex-shrink-0 pt-6">
               <div className="w-full h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                  <span className="text-xs font-bold uppercase tracking-widest mb-1">Sponsored</span>
                  <span className="text-xs">This ad space could be yours!</span>
               </div>
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

