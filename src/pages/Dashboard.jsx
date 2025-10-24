import React, { memo, useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/layout';
import { Button } from '@/components/common';
import { BalanceList, ExpenseList } from '@/components/feature';
import AddExpenseModal from '@/components/feature/AddExpenseModal';
import SettleUpModal from '@/components/feature/SettleUpModal';
import { useApp } from '@/context';
import {
  calculateNetBalances,
  getUserBalances,
  getBalanceSummary,
  formatCurrency,
} from '@/utils';

const Dashboard = memo(() => {
  const { expenses, currentUserId, users, deleteExpense } = useApp();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [settleUpBalance, setSettleUpBalance] = useState(null);

  // Calculate balances
  const balances = useMemo(
    () => calculateNetBalances(expenses, currentUserId),
    [expenses, currentUserId]
  );

  const userBalances = useMemo(
    () => getUserBalances(balances, currentUserId, users),
    [balances, currentUserId, users]
  );

  const summary = useMemo(
    () => getBalanceSummary(balances, currentUserId),
    [balances, currentUserId]
  );

  // Get recent expenses (last 10)
  const recentExpenses = useMemo(
    () => expenses.slice(0, 10),
    [expenses]
  );

  const handleSettleUp = useCallback((balance) => {
    setSettleUpBalance(balance);
  }, []);

  const handleCloseSettleUp = useCallback(() => {
    setSettleUpBalance(null);
  }, []);

  const handleDeleteExpense = useCallback((expenseId) => {
    deleteExpense(expenseId);
  }, [deleteExpense]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Dashboard"
        actions={
          <Button
            onClick={() => setIsAddExpenseOpen(true)}
            size="sm"
            icon={<span>➕</span>}
          >
            <span className="hidden sm:inline">Add Expense</span>
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Total Owed */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-danger-500">
            <p className="text-sm font-medium text-gray-600 mb-1">You owe</p>
            <p className="text-2xl font-bold text-danger-600">
              {formatCurrency(summary.totalOwed)}
            </p>
          </div>

          {/* Total Owing */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-success-500">
            <p className="text-sm font-medium text-gray-600 mb-1">You're owed</p>
            <p className="text-2xl font-bold text-success-600">
              {formatCurrency(summary.totalOwing)}
            </p>
          </div>

          {/* Net Balance */}
          <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
            summary.isSettled
              ? 'border-gray-400'
              : summary.netBalance > 0
              ? 'border-success-500'
              : 'border-danger-500'
          }`}>
            <p className="text-sm font-medium text-gray-600 mb-1">Net Balance</p>
            {summary.isSettled ? (
              <p className="text-2xl font-bold text-gray-600">Settled ✓</p>
            ) : (
              <p className={`text-2xl font-bold ${
                summary.netBalance > 0 ? 'text-success-600' : 'text-danger-600'
              }`}>
                {summary.netBalance > 0 ? '+' : ''}{formatCurrency(Math.abs(summary.netBalance))}
              </p>
            )}
          </div>
        </div>

        {/* Balances Section */}
        {userBalances.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Balances</h2>
            </div>
            <BalanceList balances={userBalances} onSettleUp={handleSettleUp} />
          </section>
        )}

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <ExpenseList expenses={recentExpenses} onExpenseDelete={handleDeleteExpense} />
        </section>
      </div>

      {/* Modals */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />
      <SettleUpModal
        isOpen={!!settleUpBalance}
        onClose={handleCloseSettleUp}
        balance={settleUpBalance}
      />
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;

