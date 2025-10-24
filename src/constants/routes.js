export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  GROUP: '/group/:groupId',
  ALL_EXPENSES: '/expenses',
  SETTINGS: '/settings',
};

export const getGroupRoute = (groupId) => `/group/${groupId}`;

