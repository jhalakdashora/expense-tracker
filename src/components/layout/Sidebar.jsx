import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, APP_CONFIG } from '@/constants';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: ROUTES.DASHBOARD,
  },
  {
    id: 'expenses',
    label: 'All Expenses',
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

const Sidebar = memo(() => {
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
    <aside className="hidden sm:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-600 mb-8">
          {APP_CONFIG.APP_NAME}
        </h2>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 text-left
                  ${active
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

