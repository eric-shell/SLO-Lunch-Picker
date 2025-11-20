import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import FilterPanel from './components/FilterPanel';
import Spinner from './components/Spinner';
import { SlotMachine } from './components/SlotMachine';
import RestaurantResult from './components/RestaurantResult';
import { Confetti } from './components/Confetti';
import { Restaurant, FilterState, ViewState } from './types';
import { getFilteredRestaurants } from './utils/timeHelpers';
import { restaurants as initialData } from './data/restaurants';
import { trackEvent, GA_CATEGORIES, GA_ACTIONS } from './utils/analytics';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [mode, setMode] = useState<'WHEEL' | 'SLOTS'>('WHEEL');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    openNow: true, // Default to true
    useRatingWeight: false,
    cheapMealsOnly: false,
    excludedIds: [] 
  });

  useEffect(() => {
    const data = initialData;
    setRestaurants(data);
    const allCats = Array.from(new Set(data.map(r => r.category)));
    setFilters(prev => ({ ...prev, categories: allCats }));
  }, []);

  const allCategories = useMemo(() => 
    Array.from(new Set(restaurants.map(r => r.category))).sort(), 
  [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = getFilteredRestaurants(restaurants, filters.categories, filters.openNow);
    
    // Apply Cheap Eats Filter
    if (filters.cheapMealsOnly) {
      result = result.filter(r => r.price === 1);
    }

    // Apply Manual Exclusions
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
      categories: allCategories,
      openNow: true, // Reset to true
      useRatingWeight: false,
      cheapMealsOnly: false,
      excludedIds: []
    }));
  };

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-6 font-sans">
      <Header />
      
      {/* Main Content Area - Equal Height Columns */}
      <main className="flex-grow w-full flex flex-col lg:flex-row gap-8 items-stretch lg:h-[750px] mb-12">
        
        {/* Left: Filter Panel (1/3) */}
        <div className="w-full lg:w-1/3 h-full">
           <FilterPanel 
             allCategories={allCategories} 
             filters={filters} 
             setFilters={setFilters} 
             resultCount={filteredRestaurants.length}
             totalCount={restaurants.length}
             allRestaurants={restaurants}
           />
        </div>

        {/* Right: Game Container (2/3) */}
        {/* Removed overflow-hidden to allow slot machine handle to stick out */}
        <div className="w-full lg:w-2/3 h-full bg-white rounded-3xl shadow-xl border border-gray-100 relative flex flex-col">
          
          {/* Decorative Background Container */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
             <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-slo-teal to-slo-yellow"></div>
             {/* Removed background flourish circle */}
          </div>
          
          {/* Toggle Switch (Only when Idle) */}
             <div className={`absolute top-6 right-6 z-20 bg-gray-100 p-1 rounded-full flex shadow-inner transition-opacity duration-300 ${viewState === ViewState.IDLE ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button 
                  onClick={() => {
                    setMode('WHEEL');
                    trackEvent(GA_ACTIONS.CHANGE_MODE, GA_CATEGORIES.INTERACTION, 'WHEEL');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${mode === 'WHEEL' ? 'bg-white text-slo-blue shadow' : 'text-gray-400'}`}
                >
                  WHEEL
                </button>
                <button 
                  onClick={() => {
                    setMode('SLOTS');
                    trackEvent(GA_ACTIONS.CHANGE_MODE, GA_CATEGORIES.INTERACTION, 'SLOTS');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${mode === 'SLOTS' ? 'bg-white text-slo-blue shadow' : 'text-gray-400'}`}
                >
                  SLOTS
                </button>
             </div>

          {/* Content Wrapper: Center content vertically/horizontally */}
          <div className="flex-grow flex items-center justify-center p-8 relative z-10">
             
             {(viewState === ViewState.IDLE || viewState === ViewState.SPINNING) && (
                <div className="flex flex-col items-center w-full animate-fade-in">
                   
                   {/* Game Area */}
                   <div className={`mt-10 mb-6 w-full flex justify-center ${mode === 'SLOTS' ? 'mr-12' : ''}`}>
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
                   
                   {/* Empty State Message */}
                   {viewState === ViewState.IDLE && filteredRestaurants.length === 0 && (
                     <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
                        <p className="text-red-500 font-bold">No restaurants match your filters.</p>
                        <button 
                           onClick={() => {
                             setFilters(prev => ({ ...prev, categories: allCategories, openNow: false, excludedIds: [] }));
                             trackEvent(GA_ACTIONS.RESET_FILTERS, GA_CATEGORIES.FILTER, 'No Results State');
                           }}
                           className="mt-2 text-sm text-red-700 underline hover:text-red-900"
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

          {/* Reset App Button - Bottom Right of Container */}
          <div className="absolute bottom-4 right-4 z-20">
             <button 
               onClick={handleFullReset}
               className="p-2 text-xs font-bold text-gray-400 hover:text-slo-coral transition-colors flex items-center gap-1 group cursor-pointer"
               title="Reset Everything"
             >
               <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
               RESET APP
             </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;