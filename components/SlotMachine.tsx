import React, { useEffect, useState, useRef } from 'react';
import { Restaurant } from '../types';

interface Props {
  restaurants: Restaurant[];
  isSpinning: boolean;
  onFinished: () => void;
  onTriggerSpin: () => void;
  winner: Restaurant | null;
}

const getIcon = (cat: string) => {
  if (cat === 'BBQ') return '🍖';
  if (cat === 'Pizza') return '🍕';
  if (cat === 'Mexican') return '🌮';
  if (cat === 'Sandwiches') return '🥪';
  if (cat === 'Seafood') return '🍤';
  if (cat === 'Bakery') return '🍩';
  if (cat === 'Asian') return '🍜';
  if (cat === 'Global') return '🌎';
  if (cat === 'Mediterranean') return '🥙';
  return '🍽️';
};

export const SlotMachine: React.FC<Props> = ({ restaurants, isSpinning, onFinished, onTriggerSpin, winner }) => {
  const [reel1, setReel1] = useState<string>('🎲');
  const [reel2, setReel2] = useState<string>('Pull Lever');
  const [reel3, setReel3] = useState<string>('😋');
  const [leverPulled, setLeverPulled] = useState(false);
  
  const intervalRef1 = useRef<number | null>(null);
  const intervalRef2 = useRef<number | null>(null);
  const intervalRef3 = useRef<number | null>(null);

  // Update "Ready" state when filters change, but no shake
  useEffect(() => {
     if (!isSpinning) {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        if (r) {
            // Smooth update
            setTimeout(() => setReel1(getIcon(r.category)), 100);
            setTimeout(() => setReel2("Ready to Spin"), 200);
        } else {
           setReel2("No Results");
        }
     }
  }, [restaurants, isSpinning]);

  // Handle Spin Logic
  useEffect(() => {
    if (isSpinning && winner && restaurants.length > 0) {
      setLeverPulled(true);
      setTimeout(() => setLeverPulled(false), 600); // Reset lever animation after pull

      // Fast Spin
      intervalRef1.current = window.setInterval(() => {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        setReel1(getIcon(r.category));
      }, 80);

      intervalRef2.current = window.setInterval(() => {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        setReel2(r.name);
      }, 100);

      intervalRef3.current = window.setInterval(() => {
        setReel3(`${(Math.random() * 2 + 3).toFixed(1)}★`);
      }, 90);

      // Stop Sequence
      setTimeout(() => {
        if (intervalRef1.current) clearInterval(intervalRef1.current);
        setReel1(getIcon(winner.category));
      }, 1000);

      setTimeout(() => {
        if (intervalRef2.current) clearInterval(intervalRef2.current);
        setReel2(winner.name);
      }, 2000);

      setTimeout(() => {
        if (intervalRef3.current) clearInterval(intervalRef3.current);
        setReel3(`${winner.rating}★`);
        onFinished();
      }, 2500);

    } 
    
    return () => {
      if (intervalRef1.current) clearInterval(intervalRef1.current);
      if (intervalRef2.current) clearInterval(intervalRef2.current);
      if (intervalRef3.current) clearInterval(intervalRef3.current);
    };
  }, [isSpinning, winner, restaurants, onFinished]);

  const handleLeverClick = () => {
    if (!isSpinning && restaurants.length > 0) {
        setLeverPulled(true);
        onTriggerSpin();
    }
  };

  return (
    // Added padding-right to accommodate the lever
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center pt-8 relative pr-12 md:pr-24">
      
      {/* Machine Body */}
      <div className="relative z-10 p-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-3xl shadow-2xl border-4 border-gray-600 w-full max-w-2xl">
          
          {/* Metallic Bezel */}
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 p-3 rounded-2xl shadow-inner">
              
              {/* Screen/Reel Area */}
              <div className="bg-white rounded-xl border-4 border-gray-800 flex flex-row gap-2 items-stretch justify-center h-40 md:h-48 p-2 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2 pointer-events-none z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent h-1/4 bottom-0 pointer-events-none z-10"></div>

                {/* Reel 1 */}
                <div className="w-20 md:w-24 bg-gray-100 rounded-lg border-x border-gray-300 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-400 to-transparent z-0"></div>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-400 to-transparent z-0"></div>
                    <span className="text-4xl md:text-5xl relative z-0 drop-shadow-sm select-none">{reel1}</span>
                </div>

                {/* Reel 2 (Main) - Fixed width to prevent jumping */}
                <div className="flex-1 w-0 min-w-0 bg-gray-100 rounded-lg border-x border-gray-300 flex items-center justify-center relative overflow-hidden px-2 text-center">
                    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-400 to-transparent z-0"></div>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-400 to-transparent z-0"></div>
                    <span className="text-xl md:text-3xl font-serif font-bold text-slo-blue tracking-tight relative z-0 drop-shadow-sm truncate w-full select-none">
                        {reel2}
                    </span>
                </div>

                {/* Reel 3 */}
                <div className="w-20 md:w-24 bg-gray-100 rounded-lg border-x border-gray-300 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-400 to-transparent z-0"></div>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-400 to-transparent z-0"></div>
                    <span className="text-xl md:text-2xl font-bold text-slo-coral relative z-0 drop-shadow-sm select-none">{reel3}</span>
                </div>

              </div>
          </div>

          {/* Machine Bottom Trim */}
          <div className="mt-2 h-4 bg-gray-800 rounded-full mx-4 opacity-50"></div>
      </div>

      {/* Lever Assembly - Positioned absolutely relative to the flex container, using the padding area */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-64 w-20 z-0">
         
         {/* Base Connector to Machine - positioned to connect to the machine body to the left */}
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-24 bg-gradient-to-r from-gray-800 to-gray-600 border-y border-gray-500 shadow-xl -translate-x-full"></div>
         
         {/* The Lever Arm SVG */}
         <svg width="100" height="300" viewBox="0 0 100 300" className="absolute left-[-30px] top-1/2 -translate-y-1/2 overflow-visible">
             <g 
                className="origin-[10px_150px] transition-transform duration-500 ease-in-out"
                style={{ transform: leverPulled ? 'rotate(180deg)' : 'rotate(0deg)' }}
             >
                {/* Stick */}
                <rect x="0" y="30" width="12" height="120" rx="6" fill="url(#stickGradient)" stroke="#999" strokeWidth="1"/>
                
                {/* Knob */}
                <circle cx="6" cy="30" r="24" fill="url(#knobGradient)" stroke="#900" strokeWidth="1" 
                    className={`cursor-pointer ${isSpinning ? 'cursor-not-allowed' : 'hover:brightness-110'}`}
                    onClick={handleLeverClick}
                />
             </g>
             <defs>
                 <linearGradient id="stickGradient" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="#E2E8F0" />
                     <stop offset="50%" stopColor="#CBD5E0" />
                     <stop offset="100%" stopColor="#A0AEC0" />
                 </linearGradient>
                 <radialGradient id="knobGradient" cx="30%" cy="30%" r="70%">
                     <stop offset="0%" stopColor="#FC8181" />
                     <stop offset="100%" stopColor="#C53030" />
                 </radialGradient>
             </defs>
         </svg>

         {/* Fulcrum Cover */}
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400 rounded-full border-4 border-gray-600 shadow-md pointer-events-none -translate-x-[calc(100%+10px)]"></div>
      </div>

      {/* Mobile Trigger Button (Shown if lever is hidden) */}
      <div className="md:hidden absolute -bottom-20">
         <button 
            onClick={onTriggerSpin}
            disabled={isSpinning}
            className="px-8 py-3 bg-slo-coral text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform"
         >
            SPIN!
         </button>
      </div>

    </div>
  );
};