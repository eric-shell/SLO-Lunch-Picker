import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center pt-10 pb-6">
    <h1 className="text-5xl md:text-6xl text-slo-blue font-serif tracking-tight">
      SLO Lunch Picker
    </h1>
    <p className="text-slo-navy mt-2 text-lg font-bold tracking-wide uppercase text-xs">
      Get help choosing your next lunch spot in San Luis Obispo
    </p>
  </header>
);