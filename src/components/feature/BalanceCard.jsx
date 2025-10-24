import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@/components/common';
import { formatCurrency } from '@/utils';

const BalanceCard = memo(({ balance, onClick }) => {
  const { userName, amount, type } = balance;
  const isOwed = type === 'owes_you';

  return (
    <Card
      hoverable
      onClick={onClick}
      className="border-l-4"
      style={{
        borderLeftColor: isOwed ? '#22c55e' : '#ef4444',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            {isOwed ? (
              <>
                <span className="font-semibold text-gray-900">{userName}</span> owes you
              </>
            ) : (
              <>
                You owe <span className="font-semibold text-gray-900">{userName}</span>
              </>
            )}
          </p>
          <p className={`text-lg font-bold mt-1 ${isOwed ? 'text-success-600' : 'text-danger-600'}`}>
            {formatCurrency(amount)}
          </p>
        </div>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isOwed
              ? 'bg-success-50 text-success-700 hover:bg-success-100'
              : 'bg-danger-50 text-danger-700 hover:bg-danger-100'
          }`}
        >
          Settle up
        </button>
      </div>
    </Card>
  );
});

BalanceCard.propTypes = {
  balance: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['owes_you', 'you_owe']).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

BalanceCard.displayName = 'BalanceCard';

export default BalanceCard;

