declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

export const GA_CATEGORIES = {
  INTERACTION: 'Interaction',
  FILTER: 'Filter',
  GAME: 'Game',
  OUTBOUND: 'Outbound'
};

export const GA_ACTIONS = {
  SPIN: 'spin',
  CHANGE_MODE: 'change_mode',
  TOGGLE_FILTER: 'toggle_filter',
  TOGGLE_CATEGORY: 'toggle_category',
  RESET_APP: 'reset_app',
  RESET_FILTERS: 'reset_filters',
  SHOW_ALL_LIST: 'show_all_list',
  GET_DIRECTIONS: 'get_directions',
  SPIN_AGAIN: 'spin_again',
  EXCLUDE_RESTAURANT: 'exclude_restaurant'
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  
  // Debug helper
  // console.log('[GA Event Triggered]', { action, category, label, value });

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

