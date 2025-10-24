import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ExpenseItem from './ExpenseItem';
import { MESSAGES } from '@/constants';

const ExpenseList = memo(({ expenses, onExpenseClick, onExpenseDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💸</div>
        <p className="text-lg font-semibold text-gray-900">{MESSAGES.NO_EXPENSES}</p>
        <p className="text-sm text-gray-600 mt-1">Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onClick={() => onExpenseClick && onExpenseClick(expense)}
          onDelete={onExpenseDelete}
        />
      ))}
    </div>
  );
});

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      paidBy: PropTypes.string.isRequired,
      splits: PropTypes.array.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onExpenseClick: PropTypes.func,
  onExpenseDelete: PropTypes.func,
};

ExpenseList.displayName = 'ExpenseList';

export default ExpenseList;

