import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FoodPickerPortal from './components/FoodPickerPortal';
import { restaurantData, PORTAL_CRAVINGS } from './data/restaurantData';

// Theme configurations for each portal
const themes = {
  coffee: {
    background: 'bg-stone-50',
    accent: 'from-amber-200 to-stone-300',
    text: 'text-amber-900',
    ring: 'ring-amber-500',
  },
  breakfast: {
    background: 'bg-orange-50',
    accent: 'from-yellow-200 to-orange-300',
    text: 'text-orange-900',
    ring: 'ring-yellow-400',
  },
  lunch: {
    background: 'bg-teal-50',
    accent: 'from-teal-200 to-sky-300',
    text: 'text-teal-900',
    ring: 'ring-teal-400',
  },
  dinner: {
    background: 'bg-indigo-50',
    accent: 'from-indigo-200 to-blue-300',
    text: 'text-indigo-900',
    ring: 'ring-indigo-400',
  },
  drinks: {
    background: 'bg-purple-50',
    accent: 'from-purple-200 to-slate-300',
    text: 'text-purple-900',
    ring: 'ring-purple-400',
  },
  treats: {
    background: 'bg-pink-50',
    accent: 'from-pink-200 to-rose-300',
    text: 'text-pink-900',
    ring: 'ring-pink-400',
  },
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route 
          path="/coffee" 
          element={
            <FoodPickerPortal 
              title="Coffee & Cafes" 
              restaurantData={restaurantData.coffee} 
              filterOptions={PORTAL_CRAVINGS.coffee}
              theme={themes.coffee}
            />
          } 
        />
        
        <Route 
          path="/breakfast" 
          element={
            <FoodPickerPortal 
              title="Breakfast & Brunch" 
              restaurantData={restaurantData.breakfast} 
              filterOptions={PORTAL_CRAVINGS.breakfast}
              theme={themes.breakfast}
            />
          } 
        />
        
        <Route 
          path="/lunch" 
          element={
            <FoodPickerPortal 
              title="SLO Foodie Picker" 
              restaurantData={restaurantData.lunch} 
              filterOptions={PORTAL_CRAVINGS.lunch}
              theme={themes.lunch}
            />
          } 
        />
        
        <Route 
          path="/dinner" 
          element={
            <FoodPickerPortal 
              title="Dinner Decider" 
              restaurantData={restaurantData.dinner} 
              filterOptions={PORTAL_CRAVINGS.dinner}
              theme={themes.dinner}
            />
          } 
        />
        
        <Route 
          path="/drinks" 
          element={
            <FoodPickerPortal 
              title="Drinks & Nightlife" 
              restaurantData={restaurantData.drinks} 
              filterOptions={PORTAL_CRAVINGS.drinks}
              theme={themes.drinks}
            />
          } 
        />
        
        <Route 
          path="/treats" 
          element={
            <FoodPickerPortal 
              title="Treats & Sweets" 
              restaurantData={restaurantData.treats} 
              filterOptions={PORTAL_CRAVINGS.treats}
              theme={themes.treats}
            />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
