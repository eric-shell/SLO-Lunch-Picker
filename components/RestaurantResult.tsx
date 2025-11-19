import React from 'react';
import { Restaurant } from '../types';
import { isOpenNow, getTodaysHours } from '../utils/timeHelpers';

interface Props {
  restaurant: Restaurant;
  onSpinAgain: () => void;
}

const RestaurantResult: React.FC<Props> = ({ restaurant, onSpinAgain }) => {
  const open = isOpenNow(restaurant.hours);
  const hoursToday = getTodaysHours(restaurant.hours);

  return (
    <div className="w-full max-w-md chalkboard-texture p-4 rounded-xl shadow-2xl border-8 border-wood-light transform rotate-1 animate-[slideIn_0.5s_ease-out]">
      
      {/* Chalk Content */}
      <div className="border-2 border-dashed border-white/20 p-6 h-full flex flex-col items-center text-center text-white/90 font-hand">
        
        <div className="mb-2 text-yellow-200 text-5xl">★</div>
        
        <h2 className="text-4xl font-bold text-white mb-2 tracking-widest uppercase font-sans">{restaurant.name}</h2>
        <p className="text-xl text-gray-300 mb-6">{restaurant.category}</p>
        
        <div className="space-y-4 w-full mb-8">
          <div className="bg-white/10 p-3 rounded">
            <p className="text-2xl">{restaurant.address}</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-lg">
            <span className={`${open ? 'text-green-400' : 'text-red-400'} font-bold font-sans`}>
              {open ? 'OPEN NOW' : 'CLOSED'}
            </span>
            <span>•</span>
            <span>Hours: {hoursToday}</span>
          </div>
          
          <div className="flex justify-center gap-4 text-lg">
             <span className="text-yellow-400 font-sans">{'★'.repeat(Math.round(restaurant.rating))} <span className="text-gray-500 text-sm">({restaurant.rating})</span></span>
             <span className="text-green-400 font-sans">{'$'.repeat(restaurant.price)}</span>
          </div>

          {restaurant.notes && (
            <p className="text-xl text-yellow-100 italic rotate-[-1deg] mt-2">"{restaurant.notes}"</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 w-full font-sans">
          <a 
            href={restaurant.mapUrl} 
            target="_blank" 
            rel="noreferrer"
            className="block w-full py-3 bg-white text-black hover:bg-gray-200 rounded font-bold transition-colors shadow-lg"
          >
            DIRECTIONS
          </a>
          
          <button 
            onClick={onSpinAgain}
            className="mt-2 w-full py-3 bg-dart-red hover:bg-red-700 text-white rounded font-bold text-lg shadow-lg transition-all"
          >
            SPIN AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantResult;