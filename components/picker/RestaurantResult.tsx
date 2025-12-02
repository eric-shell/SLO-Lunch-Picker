import React from 'react';
import { Restaurant } from '../../types';
import { isOpenNow, getTodaysHours } from '../../utils/timeHelpers';
import { trackEvent, GA_ACTIONS, GA_CATEGORIES } from '../../utils/analytics';

interface Props {
  restaurant: Restaurant;
  onSpinAgain: () => void;
}

const RestaurantResult: React.FC<Props> = ({ restaurant, onSpinAgain }) => {
  const open = isOpenNow(restaurant.hours);
  const hoursToday = getTodaysHours(restaurant.hours);

  return (
    // Added z-[60] to ensure it sits on top of the Confetti (z-40)
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center animate-slide-up border border-gray-100 relative overflow-hidden z-[60]">
      
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slo-teal via-slo-yellow to-slo-coral"></div>
      
      <h2 className="text-gray-600 font-bold text-xs tracking-widest uppercase mb-4">You're going to</h2>
      
      <h1 className="text-4xl md:text-5xl font-serif text-slo-blue mb-2 leading-tight">
        {restaurant.name}
      </h1>
      
      <p className="text-lg text-slo-teal font-semibold pt-1 pb-4">{restaurant.categories.join(', ')}</p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
           {restaurant.address}
        </div>

        <div className="flex items-center justify-center gap-4">
           <span className={`px-3 py-1 rounded-full text-xs font-bold ${open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
             {open ? 'OPEN NOW' : 'CLOSED'}
           </span>
           <span className="text-sm text-gray-500">{hoursToday}</span>
        </div>

        <div className="flex justify-center gap-6 text-sm pt-2 border-t border-gray-200 mt-2">
           <span className="flex items-center gap-1 text-slo-yellow font-bold">
             ★ {restaurant.rating}
           </span>
           <span className="flex items-center gap-1 text-gray-400">
             {Array(3).fill(0).map((_, i) => (
               <span key={i} className={i < restaurant.price ? 'text-green-600 font-bold' : 'text-gray-300'}>$</span>
             ))}
           </span>
        </div>
      </div>

      <div className="grid gap-3">
        <a 
          href={restaurant.mapUrl} 
          target="_blank" 
          rel="noreferrer"
          onClick={() => trackEvent(GA_ACTIONS.GET_DIRECTIONS, GA_CATEGORIES.OUTBOUND, restaurant.name)}
          className="block w-full py-3 bg-slo-blue hover:bg-sky-950 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20"
        >
          Get Directions
        </a>
        
        <button 
          onClick={onSpinAgain}
          className="block w-full py-3 bg-white hover:bg-gray-50 text-slo-text border-2 border-gray-200 rounded-xl font-bold transition-colors cursor-pointer"
        >
          Spin Again
        </button>
      </div>

    </div>
  );
};

export default RestaurantResult;

