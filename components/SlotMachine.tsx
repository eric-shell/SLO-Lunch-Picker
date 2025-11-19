import React, { useEffect, useState, useRef } from 'react';
import { Restaurant } from '../types';

interface Props {
  restaurants: Restaurant[];
  isSpinning: boolean;
  onFinished: () => void;
  winner: Restaurant | null;
}

// Helper to get category icons
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

export const SlotMachine: React.FC<Props> = ({ restaurants, isSpinning, onFinished, winner }) => {
  // We spin 3 reels: [Icon] [Name] [Price/Rating]
  const [reel1, setReel1] = useState<string>('🎰');
  const [reel2, setReel2] = useState<string>('PULL THE LEVER');
  const [reel3, setReel3] = useState<string>('💰');

  // Refs for intervals
  const intervalRef1 = useRef<number | null>(null);
  const intervalRef2 = useRef<number | null>(null);
  const intervalRef3 = useRef<number | null>(null);

  useEffect(() => {
    if (isSpinning && winner && restaurants.length > 0) {
      // START SPINNING

      // Reel 1: Icons (Fastest)
      intervalRef1.current = window.setInterval(() => {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        setReel1(getIcon(r.category));
      }, 80);

      // Reel 2: Names (Medium)
      intervalRef2.current = window.setInterval(() => {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        setReel2(r.name);
      }, 100);

      // Reel 3: Rating/Price (Fast)
      intervalRef3.current = window.setInterval(() => {
        setReel3(['💲', '⭐⭐', '💵', '⭐⭐⭐', '💲💲', '⭐⭐⭐⭐'].sort(() => Math.random() - 0.5)[0]);
      }, 90);

      // STOPPING SEQUENCE
      
      // Stop Reel 1 (Icon) at 1.5s
      setTimeout(() => {
        if (intervalRef1.current) clearInterval(intervalRef1.current);
        setReel1(getIcon(winner.category));
      }, 1500);

      // Stop Reel 2 (Name) at 2.5s
      setTimeout(() => {
        if (intervalRef2.current) clearInterval(intervalRef2.current);
        setReel2(winner.name);
      }, 2500);

      // Stop Reel 3 (Stats) at 3.5s
      setTimeout(() => {
        if (intervalRef3.current) clearInterval(intervalRef3.current);
        setReel3(`${winner.rating}★`);
        onFinished();
      }, 3500);

    } else if (!isSpinning && !winner) {
      // Reset state
      setReel1('🎰');
      setReel2('READY');
      setReel3('💰');
    }

    return () => {
      if (intervalRef1.current) clearInterval(intervalRef1.current);
      if (intervalRef2.current) clearInterval(intervalRef2.current);
      if (intervalRef3.current) clearInterval(intervalRef3.current);
    };
  }, [isSpinning, winner, restaurants, onFinished]);

  return (
    <div className="relative p-6 bg-wood-dark rounded-xl border-8 border-wood-light shadow-2xl max-w-3xl mx-auto transform scale-90 md:scale-100">
      {/* Brass Frame Top */}
      <div className="absolute top-0 left-0 right-0 h-4 brass-gradient rounded-t-lg opacity-80"></div>
      
      {/* Machine Body */}
      <div className="flex flex-row gap-2 md:gap-4 items-center justify-center bg-black/30 p-6 rounded-lg border-4 border-yellow-700 shadow-inner">
        
        {/* REEL 1: Category */}
        <div className="relative overflow-hidden w-20 h-32 md:w-24 md:h-40 bg-white rounded border-4 border-gray-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none z-10"></div>
          <span className={`text-5xl md:text-6xl ${isSpinning && !winner ? 'slot-motion-blur' : ''}`}>
            {reel1}
          </span>
        </div>

        {/* REEL 2: Name (Wide) */}
        <div className="relative overflow-hidden w-48 md:w-80 h-32 md:h-40 bg-white rounded border-4 border-gray-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center px-2 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none z-10"></div>
          <span className={`text-xl md:text-3xl font-sans font-black text-gray-800 uppercase leading-tight ${isSpinning && !winner ? 'slot-motion-blur blur-sm' : ''}`}>
            {reel2}
          </span>
        </div>

        {/* REEL 3: Price/Rating */}
        <div className="relative overflow-hidden w-20 h-32 md:w-24 md:h-40 bg-white rounded border-4 border-gray-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none z-10"></div>
          <span className={`text-2xl md:text-3xl font-bold text-dart-red font-sans ${isSpinning && !winner ? 'slot-motion-blur' : ''}`}>
            {reel3}
          </span>
        </div>

      </div>

      {/* Decorative Bottom Panel */}
      <div className="mt-4 h-12 brass-gradient rounded flex items-center justify-center border-2 border-yellow-800 shadow-lg">
        <span className="text-wood-dark font-serif font-bold tracking-widest text-lg opacity-70">WINNER PAID IN CALORIES</span>
      </div>
      
      {/* Mechanical Lever (Visual Only) */}
      <div className="absolute -right-12 top-20 w-8 h-32 bg-gray-400 rounded-r-lg border-l-4 border-gray-600 shadow-xl hidden md:block">
         <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-red-700 shadow-inner border-2 border-red-900 transition-transform duration-500 ${isSpinning ? 'translate-y-32' : ''}`}></div>
         <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-2 h-24 bg-gray-300 transition-transform duration-500 origin-bottom ${isSpinning ? 'scale-y-0' : ''}`}></div>
      </div>
    </div>
  );
};