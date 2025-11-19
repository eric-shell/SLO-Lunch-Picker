import React from 'react';
import { Restaurant } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  excludedIds: string[];
  onToggleExclusion: (id: string) => void;
}

const RestaurantListModal: React.FC<Props> = ({ isOpen, onClose, restaurants, excludedIds, onToggleExclusion }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative z-10 overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-serif text-slo-blue">All Restaurants</h2>
            <p className="text-sm text-gray-500">Toggle restaurants to include or exclude them from the spin.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* List */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-gray-50/50">
          <div className="grid gap-3">
            {restaurants.map(r => {
              const isIncluded = !excludedIds.includes(r.id);
              return (
                <div 
                  key={r.id} 
                  className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all
                    ${isIncluded ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-xl
                        ${isIncluded ? 'bg-slo-sand' : 'bg-gray-200 grayscale'}
                      `}
                    >
                      {/* Simple category icon mapping or generic */}
                      {r.category === 'Pizza' ? '🍕' : 
                       r.category === 'BBQ' ? '🍖' :
                       r.category === 'Mexican' ? '🌮' : '🍽️'}
                    </div>
                    <div>
                      <h3 className={`font-bold ${isIncluded ? 'text-gray-800' : 'text-gray-400'}`}>{r.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{r.category}</span>
                        <span>•</span>
                        <span>{r.rating}★</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleExclusion(r.id)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slo-teal focus:ring-offset-2
                      ${isIncluded ? 'bg-slo-teal' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${isIncluded ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slo-blue text-white rounded-xl font-bold hover:bg-blue-900 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListModal;