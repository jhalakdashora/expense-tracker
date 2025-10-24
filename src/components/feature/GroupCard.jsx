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
    <Card hoverable onClick={onClick} className="border-l-4 border-primary-500">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">
            {group.name}
          </h3>
          {group.description && (
            <p className="text-sm text-gray-600 mt-1 truncate">
              {group.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div>
              <span className="text-gray-600">Members: </span>
              <span className="font-medium text-gray-900">{group.members.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Expenses: </span>
              <span className="font-medium text-gray-900">{groupExpenses.length}</span>
            </div>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="text-right flex-shrink-0 ml-4">
          {summary.isSettled ? (
            <div className="text-success-600 font-medium">
              ✓ Settled
            </div>
          ) : (
            <>
              {summary.totalOwed > 0 && (
                <div className="text-danger-600 font-semibold">
                  You owe {formatCurrency(summary.totalOwed)}
                </div>
              )}
              {summary.totalOwing > 0 && (
                <div className="text-success-600 font-semibold">
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

