import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title?: string;
  subtitle?: string;
  themeText?: string;
}

export const Header: React.FC<Props> = ({ 
  title = "Local Foodie", 
  slogan = "Get help choosing your next meal in San Luis Obispo",
  themeText = "text-gray-700" // Default text color if not provided
}) => {

  return (
    <header className="text-center pb-8 relative">
      
      {/* Back Button Positioned relative to Header */}
      <div className="absolute bottom-4 left-0 hidden md:block">
        <Link 
          to="/" 
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full shadow-sm transition-all
            font-bold text-sm backdrop-blur-sm transform hover:-translate-y-1 hover:shadow-md
            bg-white hover:bg-sky-950 hover:text-white
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
      </div>

      <h1 className={`text-5xl md:text-6xl font-serif tracking-tight ${themeText.includes('white') ? 'text-white' : 'text-slo-blue'}`}>
        {title}
      </h1>
      <h2 className={`mt-2 text-sm font-bold tracking-wide uppercase ${themeText.includes('white') ? 'text-gray-300' : 'text-slo-navy'}`}>
        {slogan}
      </h2>
    </header>
  );
};

