import React, { memo, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout';
import { Button, Card } from '@/components/common';
import { BalanceList, ExpenseList } from '@/components/feature';
import AddExpenseModal from '@/components/feature/AddExpenseModal';
import SettleUpModal from '@/components/feature/SettleUpModal';
import { useApp } from '@/context';
import {
  calculateNetBalances,
  getUserBalances,
  filterExpensesByGroup,
  simplifyDebts,
  formatCurrency,
} from '@/utils';

const GroupDetail = memo(() => {
  const { groupId } = useParams();
  const { groups, expenses, currentUserId, users, deleteExpense, updateGroup } = useApp();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [settleUpBalance, setSettleUpBalance] = useState(null);
  const [showSimplified, setShowSimplified] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const group = groups[groupId];

  // Get group expenses
  const groupExpenses = useMemo(
    () => filterExpensesByGroup(expenses, groupId),
    [expenses, groupId]
  );

  // Calculate balances
  const balances = useMemo(
    () => calculateNetBalances(groupExpenses, currentUserId),
    [groupExpenses, currentUserId]
  );

  const userBalances = useMemo(
    () => getUserBalances(balances, currentUserId, users),
    [balances, currentUserId, users]
  );

  // Get simplified debts
  const simplifiedDebts = useMemo(
    () => simplifyDebts(balances, users),
    [balances, users]
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

  const handleToggleSimplifyDebts = useCallback(() => {
    const updatedGroup = {
      ...group,
      simplifyDebts: !group.simplifyDebts,
    };
    updateGroup(updatedGroup);
    if (!updatedGroup.simplifyDebts) {
      setShowSimplified(false); // Reset to normal view if simplification is disabled
    }
  }, [group, updateGroup]);

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showBack />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-xl text-gray-600">Group not found</p>
        </div>
      </div>
    );
  }

  const totalExpenses = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={group.name}
        showBack
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              icon={<span>⚙️</span>}
            >
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <Button
              onClick={() => setIsAddExpenseOpen(true)}
              size="sm"
              icon={<span>➕</span>}
            >
              <span className="hidden sm:inline">Add Expense</span>
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Group Info Card */}
        <Card className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {group.name}
              </h2>
              {group.description && (
                <p className="text-gray-600 mb-3">{group.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>👥 {group.members.length} members</span>
                <span>•</span>
                <span>💰 {groupExpenses.length} expenses</span>
                <span>•</span>
                <span>Total: {formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Group Settings */}
          {showSettings && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Group Settings</h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={group.simplifyDebts !== false}
                  onChange={handleToggleSimplifyDebts}
                  className="mt-1 w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 block">
                    Simplify Debts
                  </span>
                  <span className="text-xs text-gray-600 block mt-1">
                    When enabled, debts will be automatically simplified to minimize the number of transactions needed to settle all balances.
                  </span>
                </div>
              </label>
            </div>
          )}

          {/* Group Members */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Members</h3>
            <div className="flex flex-wrap gap-2">
              {group.members.map((memberId) => {
                const user = users[memberId];
                return (
                  <div
                    key={memberId}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    <span>{user?.avatar || '👤'}</span>
                    <span className="text-sm font-medium">
                      {memberId === currentUserId ? 'You' : user?.name || 'Unknown'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Balances Section */}
        {userBalances.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Balances</h2>
              {group.simplifyDebts !== false && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSimplified(!showSimplified)}
                >
                  {showSimplified ? 'Show My Balances' : 'Simplify Debts'}
                </Button>
              )}
            </div>

            {showSimplified && group.simplifyDebts !== false ? (
              <div className="space-y-3">
                {simplifiedDebts.length === 0 ? (
                  <Card>
                    <p className="text-center text-gray-600">All settled up! ✓</p>
                  </Card>
                ) : (
                  simplifiedDebts.map((debt, index) => (
                    <Card key={index} className="border-l-4 border-primary-500">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-900">
                          <span className="font-semibold">{debt.fromName}</span>
                          {' pays '}
                          <span className="font-semibold">{debt.toName}</span>
                        </p>
                        <p className="text-lg font-bold text-primary-600">
                          {formatCurrency(debt.amount)}
                        </p>
                      </div>
                    </Card>
                  ))
                )}
                <Card padding="sm" className="bg-primary-50 border border-primary-200">
                  <p className="text-xs text-primary-900">
                    💡 These are the minimum transactions needed to settle all debts in this group.
                  </p>
                </Card>
              </div>
            ) : (
              <BalanceList balances={userBalances} onSettleUp={handleSettleUp} />
            )}
          </section>
        )}

        {/* Expenses Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Expenses</h2>
          </div>
          <ExpenseList expenses={groupExpenses} onExpenseDelete={handleDeleteExpense} />
        </section>
      </div>

      {/* Modals */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        groupId={groupId}
      />
      <SettleUpModal
        isOpen={!!settleUpBalance}
        onClose={handleCloseSettleUp}
        balance={settleUpBalance}
        groupId={groupId}
      />
    </div>
  );
});

GroupDetail.displayName = 'GroupDetail';

export default GroupDetail;

