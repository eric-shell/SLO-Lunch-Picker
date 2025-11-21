import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-gray-400 text-sm my-8 mx-auto">
    &copy; {new Date().getFullYear()} SLO Picker. Built for indecisive locals by <a href="https://eric.sh?ref=slofoodiepicker" target="_blank" className="text-slo-blue hover:text-sky-950 cursor-pointer hover:underline">eric.sh</a>.
  </footer>
);