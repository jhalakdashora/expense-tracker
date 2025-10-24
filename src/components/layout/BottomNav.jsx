import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: ROUTES.DASHBOARD,
  },
  {
    id: 'expenses',
    label: 'Expenses',
    icon: '💰',
    path: ROUTES.ALL_EXPENSES,
  },
  {
    id: 'groups',
    label: 'Groups',
    icon: '👥',
    path: ROUTES.HOME,
  },
];

const BottomNav = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === path;
    }
    if (path === ROUTES.HOME) {
      return location.pathname === path || location.pathname.startsWith('/group/');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg sm:hidden">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3
                transition-colors duration-200 min-h-touch
                ${active
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';

export default BottomNav;

