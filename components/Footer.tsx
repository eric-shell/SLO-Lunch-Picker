import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-center py-6 text-gray-500 text-sm mt-auto">
    <p>© {new Date().getFullYear()} SLO Lunch Picker.</p>
    <p className="mt-1">Built with React + Tailwind.</p>
  </footer>
);