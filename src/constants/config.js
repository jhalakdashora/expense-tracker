export const APP_CONFIG = {
  APP_NAME: 'SplitWise Clone',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  DATE_FORMAT: 'MMM DD, YYYY',
  DECIMAL_PLACES: 2,
};

export const SPLIT_TYPES = {
  EQUAL: 'equal',
  EXACT: 'exact',
  PERCENTAGE: 'percentage',
};

export const SPLIT_TYPE_LABELS = {
  [SPLIT_TYPES.EQUAL]: 'Split equally',
  [SPLIT_TYPES.EXACT]: 'Split by exact amounts',
  [SPLIT_TYPES.PERCENTAGE]: 'Split by percentage',
};

export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#ef4444' },
  { id: 'transport', name: 'Transportation', icon: '🚗', color: '#3b82f6' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#a855f7' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: 'utilities', name: 'Utilities', icon: '💡', color: '#f59e0b' },
  { id: 'rent', name: 'Rent', icon: '🏠', color: '#06b6d4' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#10b981' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: '#6366f1' },
  { id: 'other', name: 'Other', icon: '📝', color: '#6b7280' },
];

export const DEFAULT_CATEGORY = 'other';

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

