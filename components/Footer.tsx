import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-center py-8 text-gray-400 text-sm">
    <p>© {new Date().getFullYear()} SLO Lunch Picker</p>
  </footer>
);