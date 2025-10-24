import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = memo(({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-16 sm:pb-0">
        {children}
      </main>

      {/* Bottom navigation for mobile */}
      <BottomNav />
    </div>
  );
});

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.displayName = 'Layout';

export default Layout;

