import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center py-8 relative">
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-wood-light to-transparent opacity-50"></div>
    <h1 className="text-5xl md:text-6xl font-black text-dart-cream font-serif drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-wider">
      THE LUNCH PUB
    </h1>
    <p className="text-cork mt-3 text-xl font-hand tracking-wide rotate-[-1deg]">Where every spin is a win in SLO</p>
  </header>
);