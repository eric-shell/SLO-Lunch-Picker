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

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [mode, setMode] = useState<'WHEEL' | 'SLOTS'>('WHEEL');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    openNow: false,
    useRatingWeight: false,
    cheapEatsOnly: false,
  });

  // Load data on mount
  useEffect(() => {
    const data = initialData;
    setRestaurants(data);
    
    // Initialize filters with all categories
    const allCats = Array.from(new Set(data.map(r => r.category)));
    setFilters(prev => ({ ...prev, categories: allCats }));
  }, []);

  // Derived state
  const allCategories = useMemo(() => 
    Array.from(new Set(restaurants.map(r => r.category))).sort(), 
  [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = getFilteredRestaurants(restaurants, filters.categories, filters.openNow);
    
    if (filters.cheapEatsOnly) {
      result = result.filter(r => r.price === 1);
    }

    return result;
  }, [restaurants, filters]);

  const handleSpin = () => {
    if (filteredRestaurants.length === 0) return;
    
    let winner: Restaurant;

    if (filters.useRatingWeight) {
      // Weighted Random Algorithm
      const totalWeight = filteredRestaurants.reduce((sum, r) => sum + r.rating, 0);
      let randomValue = Math.random() * totalWeight;
      
      // Default to last just in case
      winner = filteredRestaurants[filteredRestaurants.length - 1];
      
      for (const r of filteredRestaurants) {
        randomValue -= r.rating;
        if (randomValue <= 0) {
          winner = r;
          break;
        }
      }
    } else {
      // Standard Random
      winner = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
    }

    setSelectedRestaurant(winner);
    setViewState(ViewState.SPINNING);
  };

  const handleSpinFinished = () => {
    setViewState(ViewState.RESULT);
  };

  const handleReset = () => {
    setViewState(ViewState.IDLE);
    setSelectedRestaurant(null);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4 overflow-x-hidden">
      <Header />
      
      <main className="flex-grow flex flex-col lg:flex-row gap-12 items-start justify-center pb-12 mt-8">
        
        {/* Left Col: Filters */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1 relative z-10">
           <FilterPanel 
             allCategories={allCategories} 
             filters={filters} 
             setFilters={setFilters} 
             resultCount={filteredRestaurants.length}
             totalCount={restaurants.length}
           />
        </div>

        {/* Right Col: Action Area */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2 flex flex-col items-center min-h-[600px]">
          
          {/* Mode Toggle Switch */}
          {viewState === ViewState.IDLE && (
             <div className="mb-6 flex items-center bg-wood-light p-2 rounded-full shadow-inner border border-wood-dark">
                <button 
                  onClick={() => setMode('WHEEL')}
                  className={`px-4 py-1 rounded-full font-serif text-sm transition-all ${mode === 'WHEEL' ? 'bg-dart-cream text-wood-dark font-bold shadow' : 'text-gray-400'}`}
                >
                  Wheel
                </button>
                <button 
                  onClick={() => setMode('SLOTS')}
                  className={`px-4 py-1 rounded-full font-serif text-sm transition-all ${mode === 'SLOTS' ? 'bg-dart-cream text-wood-dark font-bold shadow' : 'text-gray-400'}`}
                >
                  Slots
                </button>
             </div>
          )}

          {/* State: IDLE */}
          {viewState === ViewState.IDLE && (
            <div className="text-center w-full flex flex-col items-center">
              
              <div className="mb-8 transform transition-all duration-500">
                 {mode === 'WHEEL' ? (
                    <Spinner 
                      restaurants={filteredRestaurants} 
                      isSpinning={false} 
                      onFinished={() => {}} 
                      winner={null}
                      useWeight={filters.useRatingWeight}
                    />
                 ) : (
                    <SlotMachine
                      restaurants={filteredRestaurants}
                      isSpinning={false}
                      onFinished={() => {}}
                      winner={null}
                    />
                 )}
              </div>
              
              <div className="relative z-20">
                <button 
                  onClick={handleSpin}
                  disabled={filteredRestaurants.length === 0}
                  className={`
                    px-16 py-6 rounded-lg text-3xl font-serif font-black shadow-2xl border-4 border-wood-light
                    transform transition-all duration-200
                    ${filteredRestaurants.length > 0 
                      ? 'bg-dart-red text-dart-cream hover:scale-105 hover:shadow-red-900/50 hover:bg-red-700 active:scale-95 cursor-pointer' 
                      : 'bg-gray-600 text-gray-400 border-gray-700 cursor-not-allowed'}
                  `}
                >
                  {filteredRestaurants.length > 0 ? (mode === 'WHEEL' ? 'SPIN!' : 'PULL!') : 'No Spots Found'}
                </button>
                {filteredRestaurants.length === 0 && (
                    <div className="mt-4 bg-black/50 p-2 rounded text-red-300 font-bold animate-bounce">
                      Check the Corkboard filters!
                    </div>
                )}
              </div>
            </div>
          )}

          {/* State: SPINNING */}
          {viewState === ViewState.SPINNING && (
             <div className="text-center w-full">
                <div className="mb-8">
                  {mode === 'WHEEL' ? (
                    <Spinner 
                      restaurants={filteredRestaurants} 
                      isSpinning={true} 
                      onFinished={handleSpinFinished} 
                      winner={selectedRestaurant}
                      useWeight={filters.useRatingWeight}
                    />
                  ) : (
                     <SlotMachine
                      restaurants={filteredRestaurants}
                      isSpinning={true}
                      onFinished={handleSpinFinished}
                      winner={selectedRestaurant}
                    />
                  )}
                </div>
                <p className="text-3xl font-serif font-bold text-dart-cream animate-pulse mt-8 drop-shadow-lg">
                  {mode === 'WHEEL' ? 'Round and round...' : 'Feeling Lucky...'}
                </p>
             </div>
          )}

          {/* State: RESULT */}
          {viewState === ViewState.RESULT && selectedRestaurant && (
            <div className="w-full flex justify-center relative z-10 mt-10">
              <Confetti />
              <RestaurantResult 
                restaurant={selectedRestaurant} 
                onSpinAgain={handleReset} 
              />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;