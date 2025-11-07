import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@/components/common';
import { useApp } from '@/context';
import { calculateNetBalances, getBalanceSummary, filterExpensesByGroup, formatCurrency } from '@/utils';

const GroupCard = memo(({ group, onClick }) => {
  const { expenses, currentUserId } = useApp();
  
  const groupExpenses = useMemo(
    () => filterExpensesByGroup(expenses, group.id),
    [expenses, group.id]
  );

  const balances = useMemo(
    () => calculateNetBalances(groupExpenses, currentUserId),
    [groupExpenses, currentUserId]
  );

  const summary = useMemo(
    () => getBalanceSummary(balances, currentUserId),
    [balances, currentUserId]
  );

  return (
    <Card hoverable onClick={onClick} className="border-l-4 border-primary-500 overflow-hidden relative group">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg truncate">
            {group.name}
          </h3>
          {group.description && (
            <p className="text-sm text-gray-600 mt-1.5 truncate">
              {group.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl">👥</span>
              <span className="text-gray-600">{group.members.length} member{group.members.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl">💰</span>
              <span className="text-gray-600">{groupExpenses.length} expense{groupExpenses.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="text-right flex-shrink-0 ml-4">
          {summary.isSettled ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-100 text-success-700 rounded-xl font-semibold text-sm">
              <span>✓</span>
              <span>Settled</span>
            </div>
          ) : (
            <>
              {summary.totalOwed > 0 && (
                <div className="px-3 py-1.5 bg-danger-100 text-danger-700 rounded-xl font-semibold text-sm mb-2">
                  You owe {formatCurrency(summary.totalOwed)}
                </div>
              )}
              {summary.totalOwing > 0 && (
                <div className="px-3 py-1.5 bg-success-100 text-success-700 rounded-xl font-semibold text-sm">
                  You're owed {formatCurrency(summary.totalOwing)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
});

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

GroupCard.displayName = 'GroupCard';

export default GroupCard;

