import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@/components/common';
import { formatCurrency, formatRelativeDate } from '@/utils';
import { EXPENSE_CATEGORIES, DEFAULT_CATEGORY, MESSAGES } from '@/constants';
import { useApp } from '@/context';

const ExpenseItem = memo(({ expense, onClick, onDelete }) => {
  const { users, currentUserId } = useApp();
  const { description, amount, paidBy, splits, category, date, isPayment } = expense;

  const categoryInfo = useMemo(() => {
    return EXPENSE_CATEGORIES.find((cat) => cat.id === category) ||
      EXPENSE_CATEGORIES.find((cat) => cat.id === DEFAULT_CATEGORY);
  }, [category]);

  const paidByUser = users[paidBy];
  const currentUserSplit = splits.find((split) => split.userId === currentUserId);
  const isPaidByCurrentUser = paidBy === currentUserId;

  const userShare = currentUserSplit ? currentUserSplit.amount : 0;

  const handleDelete = useCallback((e) => {
    e.stopPropagation(); // Prevent card click event
    if (window.confirm(MESSAGES.CONFIRM_DELETE_EXPENSE)) {
      onDelete?.(expense.id);
    }
  }, [expense.id, onDelete]);

  return (
    <Card
      hoverable
      onClick={onClick}
      className="border-l-4"
      style={{ borderLeftColor: isPayment ? '#6b7280' : categoryInfo.color }}
    >
      <div className="flex items-start gap-3">
        {/* Category Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ backgroundColor: `${categoryInfo.color}20` }}
        >
          {categoryInfo.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {description}
              </h4>
              <p className="text-sm text-gray-600 mt-0.5">
                {paidByUser?.name || 'Unknown'} paid {formatCurrency(amount)}
              </p>
            </div>
            
            {/* Amount and Actions */}
            <div className="flex items-start gap-2 flex-shrink-0">
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatCurrency(amount)}
                </p>
                {!isPaidByCurrentUser && userShare > 0 && (
                  <p className={`text-sm mt-0.5 ${userShare > 0 ? 'text-danger-600' : 'text-success-600'}`}>
                    You owe {formatCurrency(userShare)}
                  </p>
                )}
                {isPaidByCurrentUser && splits.length > 1 && (
                  <p className="text-sm text-success-600 mt-0.5">
                    You lent {formatCurrency(amount - userShare)}
                  </p>
                )}
              </div>
              
              {/* Delete Button */}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  aria-label="Delete expense"
                  title="Delete expense"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Date and Split Info */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>{formatRelativeDate(date)}</span>
            <span>•</span>
            <span>{splits.length} {splits.length === 1 ? 'person' : 'people'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
});

ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    paidBy: PropTypes.string.isRequired,
    splits: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isPayment: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

ExpenseItem.displayName = 'ExpenseItem';

export default ExpenseItem;

