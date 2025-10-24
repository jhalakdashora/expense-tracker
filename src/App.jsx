import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/context';
import { Layout } from '@/components/layout';
import { Dashboard, Groups, GroupDetail, AllExpenses } from '@/pages';
import { ROUTES } from '@/constants';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Groups />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.GROUP} element={<GroupDetail />} />
            <Route path={ROUTES.ALL_EXPENSES} element={<AllExpenses />} />
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;

