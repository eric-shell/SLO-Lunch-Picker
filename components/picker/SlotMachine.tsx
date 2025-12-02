import React, { useEffect, useState, useRef } from 'react';
import { Restaurant } from '../../types';

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
  if (cat === 'American') return '🍔';
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

  // Update "Ready" state when filters change
  useEffect(() => {
     if (!isSpinning) {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        if (r) {
            setTimeout(() => setReel1(getIcon(r.categories[0])), 100);
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
      setTimeout(() => setLeverPulled(false), 600);

      // Fast Spin
      intervalRef1.current = window.setInterval(() => {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        setReel1(getIcon(r.categories[0]));
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
        setReel1(getIcon(winner.categories[0]));
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
    // Removed right padding to ensure true centering in the flex container
    <div className="w-full max-w-5xl mx-auto flex items-center justify-center pt-8">
      
      {/* Container wrapper for positioning logic */}
      {/* Added w-full max-w-2xl here to control the width from the parent, allowing absolute elements to attach relative to this frame */}
      <div className="relative w-full max-w-2xl">

          {/* Machine Body */}
          <div className="relative z-10 p-4 pb-7 bg-gradient-to-b from-gray-700 to-gray-900 rounded-3xl shadow-2xl border-4 border-gray-600 w-full mx-auto">
              
              {/* Metallic Bezel */}
              <div className="bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 p-3 rounded-2xl shadow-inner">
                  
                  {/* Screen/Reel Area */}
                  <div className="bg-white rounded-xl border-4 border-gray-800 flex flex-row gap-2 items-stretch justify-center h-40 md:h-48 p-2 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2 pointer-events-none z-20"></div>

                    {/* Reel 1 */}
                    <div className="w-20 md:w-24 bg-gray-100 rounded-lg border-x border-gray-300 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        {/* Flipped Gradient: Shadow at Top */}
                        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-400 to-transparent z-0"></div>
                        <span className="text-4xl md:text-5xl relative z-10 drop-shadow-sm select-none">{reel1}</span>
                    </div>

                    {/* Reel 2 (Main) */}
                    <div className="flex-1 w-0 min-w-[150px] bg-gray-100 rounded-lg border-x border-gray-300 flex items-center justify-center relative overflow-hidden px-2 text-center">
                        {/* Flipped Gradient: Shadow at Top */}
                        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-400 to-transparent z-0"></div>
                        <span className="text-xl md:text-3xl font-serif font-bold text-slo-blue tracking-tight relative z-10 drop-shadow-sm truncate w-full select-none">
                            {reel2}
                        </span>
                    </div>

                    {/* Reel 3 */}
                    <div className="w-20 md:w-24 bg-gray-100 rounded-lg border-x border-gray-300 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        {/* Flipped Gradient: Shadow at Top */}
                        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-400 to-transparent z-0"></div>
                        <span className="text-xl md:text-2xl font-bold text-slo-coral relative z-10 drop-shadow-sm select-none">{reel3}</span>
                    </div>

                  </div>
              </div>

              {/* Machine Bottom Trim */}
              <div className="mt-2 h-4 bg-gray-800 rounded-full mx-4 opacity-50"></div>
          </div>

          {/* Lever Assembly - Positioned ABSOLUTELY relative to the machine wrapper */}
          {/* Adjusted right position to attach firmly to the side (-right-24) */}
          <div className="hidden md:block absolute -right-24 top-1/2 -translate-y-1/2 h-64 w-24 z-20">
            
            {/* Base Connector - Sits behind the lever but visually attached to the machine */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-16 bg-gradient-to-r from-gray-700 to-gray-500 rounded-r-lg shadow-xl border-y border-r border-gray-600"></div>

             {/* The Lever SVG */}
             <svg width="100" height="300" viewBox="0 0 100 300" className="absolute left-2 top-1/2 -translate-y-1/2 overflow-visible drop-shadow-2xl">
                 <g 
                    className="origin-[20px_150px] transition-transform duration-500 ease-in-out"
                    style={{ transform: leverPulled ? 'rotate(180deg)' : 'rotate(0deg)' }}
                 >
                    {/* Chrome Stick */}
                    <rect x="14" y="20" width="12" height="130" rx="6" fill="url(#chromeGradient)" stroke="#666" strokeWidth="1"/>
                    
                    {/* Shiny Red Knob */}
                    <circle cx="20" cy="20" r="28" fill="url(#rubyGradient)" stroke="#700" strokeWidth="1" 
                        className={`cursor-pointer ${isSpinning ? 'cursor-not-allowed' : 'hover:brightness-110'}`}
                        onClick={handleLeverClick}
                    />
                    
                    {/* Knob Highlight (Gloss) */}
                    <ellipse cx="12" cy="12" rx="8" ry="5" fill="white" fillOpacity="0.4" transform="rotate(-45 12 12)" pointerEvents="none"/>
                 </g>
                 <defs>
                     <linearGradient id="chromeGradient" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#888" />
                         <stop offset="20%" stopColor="#fff" />
                         <stop offset="50%" stopColor="#ccc" />
                         <stop offset="80%" stopColor="#888" />
                         <stop offset="100%" stopColor="#555" />
                     </linearGradient>
                     <radialGradient id="rubyGradient" cx="35%" cy="35%" r="60%">
                         <stop offset="0%" stopColor="#ff6b6b" />
                         <stop offset="40%" stopColor="#c53030" />
                         <stop offset="100%" stopColor="#742a2a" />
                     </radialGradient>
                 </defs>
             </svg>
             
             {/* Pivot Point Cap (Covering the rotation origin) */}
             <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-500 shadow-lg pointer-events-none z-30 bg-gradient-to-br from-gray-100 to-gray-500"></div>
          </div>

        {/* Mobile Trigger Button (Shown if lever is hidden) */}
        <div className="md:hidden flex justify-center relative z-50">
          <div className="-mt-16 bg-gradient-to-b from-yellow-200 to-yellow-600 p-2 rounded-full mx-auto shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_4px_10px_rgba(255,255,255,0.4)] ">
            <button 
                onClick={onTriggerSpin}
                disabled={isSpinning}
                className="px-8 py-3 rounded-full cursor-pointer text-white font-bold border-gray-200 transition-all duration-150 active:translate-y-1 active:shadow-[0_5px_10px_rgba(0,0,0,0.3)] bg-gradient-to-br from-slo-coral to-red-600 hover:scale-105"
            >
                SPIN
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

