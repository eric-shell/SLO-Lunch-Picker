import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  meals: [
    { 
      title: 'Breakfast', 
      path: '/breakfast', 
      emoji: '🥞',
      colorClass: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-900'
    },
    { 
      title: 'Lunch', 
      path: '/lunch', 
      emoji: '🥪',
      colorClass: 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-900'
    },
    { 
      title: 'Dinner', 
      path: '/dinner', 
      emoji: '🍽️',
      colorClass: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900'
    },
  ],
  extras: [
    { 
      title: 'Coffee', 
      path: '/coffee', 
      emoji: '☕',
      colorClass: 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
    },
    { 
      title: 'Treats', 
      path: '/treats', 
      emoji: '🍦',
      colorClass: 'bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-900'
    },
    { 
      title: 'Drinks', 
      path: '/drinks', 
      emoji: '🍹',
      colorClass: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-900'
    },
  ],
  legal: [
    { title: 'FAQ', path: '/faq' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms & Conditions', path: '/terms' },
  ],
};

export const Footer: React.FC = () => (
  <footer className="bg-slate-50 border-t border-slate-200 mt-auto w-full">
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Footer Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        
        {/* Column 1: Meals */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slo-blue text-sm uppercase tracking-wider mb-1">
            Meals
          </h3>
          {footerLinks.meals.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl border-2 
                transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-sm
                text-sm font-medium
                ${link.colorClass}
              `}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {link.emoji}
              </span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Column 2: Extras */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slo-blue text-sm uppercase tracking-wider mb-1">
            Extras
          </h3>
          {footerLinks.extras.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl border-2 
                transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-sm
                text-sm font-medium
                ${link.colorClass}
              `}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {link.emoji}
              </span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Column 3: Empty spacer */}
        <div className="hidden md:block" />

        {/* Column 4: Legal */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-bold text-slo-blue text-sm uppercase tracking-wider mb-4 mt-4 md:mt-0">
            Info
          </h3>
          <ul className="space-y-3">
            {footerLinks.legal.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="group flex items-center gap-2 text-gray-600 hover:text-slo-blue transition-colors text-sm"
                >
                  <span className="w-full md:w-auto hover:underline">
                    {link.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-slate-200">
        <p className="text-gray-400 text-sm text-center">
          {new Date().getFullYear()} Local Foodie. Built for indecisive locals by {' '}
          <a 
            href="https://eric.sh?ref=localfoodie" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slo-blue hover:text-sky-950 cursor-pointer hover:underline"
          >
            eric.sh
          </a>.
        </p>
      </div>
    </div>
  </footer>
);

