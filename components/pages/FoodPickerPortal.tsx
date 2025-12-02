import React, { useEffect, useMemo, useState } from 'react';
import { Header, Footer } from '../layout';
import { FilterPanel, Spinner, SlotMachine, RestaurantResult } from '../picker';
import { Confetti } from '../ui';
import { Restaurant, FilterState, ViewState } from '../../types';
import { getFilteredRestaurants } from '../../utils/timeHelpers';
import { trackEvent, GA_CATEGORIES, GA_ACTIONS } from '../../utils/analytics';

interface FoodPickerPortalProps {
  title: string;
  restaurantData: Restaurant[];
  filterOptions: string[]; // Categories/Cravings
  theme: {
    background: string;
    accent: string;
    text: string;
    ring: string;
  };
}

const FoodPickerPortal: React.FC<FoodPickerPortalProps> = ({ 
  title,
  slogan,
  restaurantData, 
  filterOptions,
  theme 
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [mode, setMode] = useState<'WHEEL' | 'SLOTS'>('WHEEL');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    openNow: true,
    useRatingWeight: false,
    cheapMealsOnly: false,
    excludedIds: [] 
  });

  // Initialize data
  useEffect(() => {
    setRestaurants(restaurantData);
    // Use provided filterOptions (cravings) as the initial categories
    setFilters(prev => ({ ...prev, categories: filterOptions }));
  }, [restaurantData, filterOptions]);

  // Handle Body Background Theme
  useEffect(() => {
    document.body.classList.add(theme.background);
    return () => {
      document.body.classList.remove(theme.background);
    };
  }, [theme.background]);

  // Filter Logic
  const filteredRestaurants = useMemo(() => {
    let result = getFilteredRestaurants(restaurants, filters.categories, filters.openNow);
    
    if (filters.cheapMealsOnly) {
      result = result.filter(r => r.price === 1);
    }

    if (filters.excludedIds.length > 0) {
      result = result.filter(r => !filters.excludedIds.includes(r.id));
    }

    return result;
  }, [restaurants, filters]);

  const handleSpin = () => {
    if (filteredRestaurants.length === 0) return;
    
    trackEvent(GA_ACTIONS.SPIN, GA_CATEGORIES.GAME, mode);

    let winner: Restaurant;

    if (filters.useRatingWeight) {
      const totalWeight = filteredRestaurants.reduce((sum, r) => sum + r.rating, 0);
      let randomValue = Math.random() * totalWeight;
      winner = filteredRestaurants[filteredRestaurants.length - 1];
      for (const r of filteredRestaurants) {
        randomValue -= r.rating;
        if (randomValue <= 0) {
          winner = r;
          break;
        }
      }
    } else {
      winner = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
    }

    setSelectedRestaurant(winner);
    setViewState(ViewState.SPINNING);
  };

  const handleSpinFinished = () => {
    setViewState(ViewState.RESULT);
  };

  const handleReset = () => {
    trackEvent(GA_ACTIONS.SPIN_AGAIN, GA_CATEGORIES.GAME);
    setViewState(ViewState.IDLE);
    setSelectedRestaurant(null);
  };

  const handleFullReset = () => {
    trackEvent(GA_ACTIONS.RESET_APP, GA_CATEGORIES.INTERACTION);
    setViewState(ViewState.IDLE);
    setSelectedRestaurant(null);
    setFilters(prev => ({
      ...prev,
      categories: filterOptions,
      openNow: false,
      useRatingWeight: false,
      cheapMealsOnly: false,
      excludedIds: []
    }));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Content - 100vh, vertically centered */}
      <div className="min-h-screen flex justify-center w-full">
        <div className={`flex flex-col max-w-7xl mx-auto px-6 py-8 w-full font-sans transition-colors duration-500 relative`}>
          
          <Header title={title} slogan={slogan} themeText={theme.text} />
          
          {/* Main Content Area */}
          <main className="w-full flex flex-col lg:flex-row gap-8 items-stretch lg:h-[800px]">
            
            {/* Left: Filter Panel */}
            <div className="w-full lg:w-1/3 h-full">
               <FilterPanel 
                 allCategories={filterOptions} 
                 filters={filters} 
                 setFilters={setFilters} 
                 resultCount={filteredRestaurants.length}
                 totalCount={restaurants.length}
                 allRestaurants={restaurants}
                 themeGradient={theme.accent}
               />
            </div>

            {/* Right: Game Container */}
            <div className="w-full lg:w-2/3 h-full bg-white rounded-3xl shadow-xl border border-gray-100 relative flex flex-col">
              
              {/* Decorative Background */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
                 <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${theme.accent}`}></div>
              </div>
              
              {/* Mode Toggle */}
                 <div className={`absolute top-6 right-4 z-20 bg-gray-100 p-1 rounded-full flex shadow-inner transition-opacity duration-300 ${viewState === ViewState.IDLE ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button 
                      onClick={() => {
                        setMode('WHEEL');
                        trackEvent(GA_ACTIONS.CHANGE_MODE, GA_CATEGORIES.INTERACTION, 'WHEEL');
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === 'WHEEL' ? 'bg-white shadow text-gray-800' : 'text-gray-400 hover:bg-sky-900 hover:text-white cursor-pointer'}`}
                    >
                      WHEEL
                    </button>
                    <button 
                      onClick={() => {
                        setMode('SLOTS');
                        trackEvent(GA_ACTIONS.CHANGE_MODE, GA_CATEGORIES.INTERACTION, 'SLOTS');
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === 'SLOTS' ? 'bg-white shadow text-gray-800' : 'text-gray-400 hover:bg-sky-900 hover:text-white cursor-pointer'}`}
                    >
                      SLOTS
                    </button>
                 </div>

              {/* Content Wrapper */}
              <div className="flex-grow flex items-center justify-center p-8 relative z-10">
                 
                 {(viewState === ViewState.IDLE || viewState === ViewState.SPINNING) && (
                    <div className="flex flex-col items-center w-full animate-fade-in">
                       
                       {/* Game Area */}
                       <div className={`mt-10 mb-6 w-full flex justify-center ${mode === 'SLOTS' ? 'lg:mr-12' : ''}`}>
                         {mode === 'WHEEL' ? (
                            <Spinner 
                              restaurants={filteredRestaurants} 
                              isSpinning={viewState === ViewState.SPINNING} 
                              onFinished={viewState === ViewState.SPINNING ? handleSpinFinished : () => {}} 
                              onTriggerSpin={handleSpin}
                              winner={viewState === ViewState.SPINNING ? selectedRestaurant : null}
                              useWeight={filters.useRatingWeight}
                            />
                         ) : (
                            <SlotMachine
                              restaurants={filteredRestaurants}
                              isSpinning={viewState === ViewState.SPINNING}
                              onFinished={viewState === ViewState.SPINNING ? handleSpinFinished : () => {}} 
                              onTriggerSpin={handleSpin}
                              winner={viewState === ViewState.SPINNING ? selectedRestaurant : null}
                            />
                         )}
                       </div>
                       
                       {/* Empty State */}
                       {viewState === ViewState.IDLE && filteredRestaurants.length === 0 && (
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center p-6 bg-red-50 rounded-xl border border-red-100 shadow-lg animate-fade-in">
                            <p className="text-red-700 font-bold">No matches found.</p>
                            <p className="text-red-900 text-sm pt-2">Either the preferences/filters that are actively selected have no results or all locations in this category are currently closed.</p>
                            <button 
                               onClick={handleFullReset}
                               className="mt-3 font-bold text-red-700 underline hover:text-red-950 cursor-pointer"
                            >
                              Reset Filters
                            </button>
                         </div>
                       )}

                    </div>
                 )}

                 {viewState === ViewState.RESULT && selectedRestaurant && (
                    <div className="w-full h-full flex items-center justify-center z-50 relative">
                      <Confetti />
                      <RestaurantResult 
                        restaurant={selectedRestaurant} 
                        onSpinAgain={handleReset} 
                      />
                    </div>
                 )}

              </div>

              {/* Reset Button */}
              <div className={`absolute bottom-4 right-4 z-20 transition-opacity duration-300 ${viewState === ViewState.IDLE ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <button 
                   onClick={handleFullReset}
                   className={`py-2 px-4 text-xs font-bold transition-colors flex items-center gap-1 group rounded-full hover:bg-sky-900 hover:text-white cursor-pointer ${theme.text}`}
                   title="Reset Everything"
                 >
                   <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                   RESET
                 </button>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Footer - Below the fold */}
      <Footer />
    </div>
  );
};

export default FoodPickerPortal;

