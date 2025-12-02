import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import { trackEvent, GA_ACTIONS, GA_CATEGORIES } from '../utils/analytics';

const portals = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    path: '/breakfast',
    emoji: '🥞',
    description: 'Pancakes, eggs, and morning vibes.',
    colorClass: 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-orange-200',
    iconBg: 'bg-yellow-100',
  },
  {
    id: 'lunch',
    title: 'Lunch',
    path: '/lunch',
    emoji: '🥪',
    description: 'Sandwiches, salads, and midday fuel.',
    colorClass: 'bg-teal-50 hover:bg-teal-100 text-teal-900 border-teal-200',
    iconBg: 'bg-teal-100',
  },
  {
    id: 'dinner',
    title: 'Dinner',
    path: '/dinner',
    emoji: '🍽️',
    description: 'Date night, fine dining, and savory eats.',
    colorClass: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-200',
    iconBg: 'bg-indigo-100',
  },
  {
    id: 'coffee',
    title: 'Coffee',
    path: '/coffee',
    emoji: '☕',
    description: 'Espresso, study spots, and pastries.',
    colorClass: 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200',
    iconBg: 'bg-amber-100',
  },
  {
    id: 'treats',
    title: 'Treats',
    path: '/treats',
    emoji: '🍦',
    description: 'Ice cream, cookies, and sweet cravings.',
    colorClass: 'bg-pink-50 hover:bg-pink-100 text-pink-900 border-pink-200',
    iconBg: 'bg-pink-100',
  },
  {
    id: 'drinks',
    title: 'Drinks',
    path: '/drinks',
    emoji: '🍹',
    description: 'Cocktails, breweries, and wine bars.',
    colorClass: 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200',
    iconBg: 'bg-purple-100',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Main Hero Section - 100vh */}
      <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-12 text-center">
          
          {/* Hero Section */}
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-slo-blue mb-4">
              Local Foodie
            </h1>
            <h2 className="text-xl text-gray-600 max-w-2xl mx-auto">
              Can't decide where to eat in San Luis Obispo? <br/>
              Choose a category and let fate decide your next meal.
            </h2>
          </div>

          {/* Portal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => (
              <Link 
                key={portal.id} 
                to={portal.path}
                onClick={() => {
                  trackEvent(
                    GA_ACTIONS.SELECT_PORTAL,
                    GA_CATEGORIES.INTERACTION,
                    portal.title
                  );
                }}
                className={`
                  group relative p-8 rounded-3xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                  flex flex-col items-center text-center cursor-pointer
                  ${portal.colorClass}
                `}
              >
                <div className={`text-5xl mb-4 p-4 rounded-full ${portal.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  {portal.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {portal.title}
                </h3>
                <p className="text-sm font-medium opacity-80 text-gray-600">
                  {portal.description}
                </p>
              </Link>
            ))}
          </div>

          {/* <div className="animate-bounce text-gray-400 text-sm flex flex-col items-center gap-2 pt-8">
            <span>Scroll for more</span>
            <span>↓</span>
          </div> */}

        </div>
      </div>

      {/* Footer - Below the fold */}
      <Footer />
    </div>
  );
};

export default LandingPage;
