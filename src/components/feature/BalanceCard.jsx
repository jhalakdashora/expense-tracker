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
      className="border-l-4 overflow-hidden relative"
      style={{
        borderLeftColor: isOwed ? '#10b981' : '#f43f5e',
      }}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: isOwed 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
            : 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
        }}
      />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">
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
          <p className={`text-xl font-bold ${isOwed ? 'text-success-600' : 'text-danger-600'}`}>
            {formatCurrency(amount)}
          </p>
        </div>
        <button
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${
            isOwed
              ? 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700'
              : 'bg-gradient-to-r from-danger-500 to-danger-600 text-white hover:from-danger-600 hover:to-danger-700'
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

