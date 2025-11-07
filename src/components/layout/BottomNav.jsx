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
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-lg border-t border-gray-100 shadow-soft-lg sm:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 px-3
                transition-all duration-300 min-h-touch rounded-2xl
                ${active
                  ? 'text-primary-600 scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 active:scale-95'
                }
              `}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl opacity-70" />
              )}
              <span className="text-2xl relative z-10 transition-transform duration-300 hover:scale-110">
                {item.icon}
              </span>
              <span className={`text-xs font-semibold relative z-10 ${active ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';

export default BottomNav;

