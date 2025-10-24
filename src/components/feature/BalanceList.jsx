import React, { memo } from 'react';
import PropTypes from 'prop-types';
import BalanceCard from './BalanceCard';
import { MESSAGES } from '@/constants';

const BalanceList = memo(({ balances, onSettleUp }) => {
  if (balances.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✅</div>
        <p className="text-lg font-semibold text-gray-900">{MESSAGES.NO_BALANCE}</p>
        <p className="text-sm text-gray-600 mt-1">You're all settled up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {balances.map((balance) => (
        <BalanceCard
          key={balance.userId}
          balance={balance}
          onClick={() => onSettleUp(balance)}
        />
      ))}
    </div>
  );
});

BalanceList.propTypes = {
  balances: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['owes_you', 'you_owe']).isRequired,
    })
  ).isRequired,
  onSettleUp: PropTypes.func.isRequired,
};

BalanceList.displayName = 'BalanceList';

export default BalanceList;

