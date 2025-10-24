import React, { memo, useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/layout';
import { Button, Card, Input } from '@/components/common';
import { ExpenseList } from '@/components/feature';
import AddExpenseModal from '@/components/feature/AddExpenseModal';
import { useApp } from '@/context';
import { calculateTotalExpenses, formatCurrency } from '@/utils';

const AllExpenses = memo(() => {
  const { expenses, deleteExpense } = useApp();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter expenses by search query
  const filteredExpenses = useMemo(() => {
    if (!searchQuery.trim()) return expenses;
    
    const query = searchQuery.toLowerCase();
    return expenses.filter((expense) =>
      expense.description.toLowerCase().includes(query)
    );
  }, [expenses, searchQuery]);

  const totalAmount = useMemo(
    () => calculateTotalExpenses(filteredExpenses),
    [filteredExpenses]
  );

  const handleDeleteExpense = useCallback((expenseId) => {
    deleteExpense(expenseId);
  }, [deleteExpense]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="All Expenses"
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
        {/* Summary Card */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Expenses
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Number of Expenses
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {filteredExpenses.length}
              </p>
            </div>
          </div>
        </Card>

        {/* Search */}
        {expenses.length > 0 && (
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              icon={
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
        )}

        {/* Expenses List */}
        <ExpenseList expenses={filteredExpenses} onExpenseDelete={handleDeleteExpense} />
      </div>

      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />
    </div>
  );
});

AllExpenses.displayName = 'AllExpenses';

export default AllExpenses;

