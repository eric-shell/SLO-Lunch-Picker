import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FoodPickerPortal from './components/FoodPickerPortal';
import { portalData, PORTAL_CRAVINGS } from './data/config';

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
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route 
          path="/breakfast" 
          element={
            <FoodPickerPortal 
              title="SLO Breakfast Picker"
              slogan="When you're too hungover to make a decision"
              restaurantData={portalData.breakfast} 
              filterOptions={PORTAL_CRAVINGS.breakfast}
              theme={themes.breakfast}
            />
          } 
        />
        
        <Route 
          path="/lunch" 
          element={
            <FoodPickerPortal 
              title="SLO Lunch Picker" 
              slogan="When you and your coworkers just can't agree"
              restaurantData={portalData.lunch} 
              filterOptions={PORTAL_CRAVINGS.lunch}
              theme={themes.lunch}
            />
          } 
        />
        
        <Route 
          path="/dinner" 
          element={
            <FoodPickerPortal 
              title="SLO Dinner Picker"
              slogan="When your partner just can't make up their mind"
              restaurantData={portalData.dinner} 
              filterOptions={PORTAL_CRAVINGS.dinner}
              theme={themes.dinner}
            />
          } 
        />

        <Route 
          path="/coffee" 
          element={
            <FoodPickerPortal 
              title="SLO Coffee Picker" 
              slogan="When it's too early to turn your brain on"
              restaurantData={portalData.coffee} 
              filterOptions={PORTAL_CRAVINGS.coffee}
              theme={themes.coffee}
            />
          } 
        />

        <Route 
          path="/treats" 
          element={
            <FoodPickerPortal 
              title="SLO Treat Picker"
              slogan="When you just need something to fix the craving"
              restaurantData={portalData.treats} 
              filterOptions={PORTAL_CRAVINGS.treats}
              theme={themes.treats}
            />
          } 
        />
        
        <Route 
          path="/drinks" 
          element={
            <FoodPickerPortal 
              title="SLO Drink Picker"
              slogan="When you day was long and your brain is clocked out"
              restaurantData={portalData.drinks} 
              filterOptions={PORTAL_CRAVINGS.drinks}
              theme={themes.drinks}
            />
          } 
        />

      </Routes>
    </Router>
  );
};

export default App;
