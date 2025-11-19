import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center pt-10 pb-6">
    <h1 className="text-5xl md:text-6xl text-slo-blue font-serif tracking-tight">
      SLO Lunch Picker
    </h1>
    <p className="text-slo-teal mt-2 text-lg font-medium tracking-wide uppercase text-xs">
      Find your next bite in 93401 & 93405
    </p>
  </header>
);