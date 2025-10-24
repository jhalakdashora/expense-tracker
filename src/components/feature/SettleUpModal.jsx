import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from '@/components/common';
import { useApp } from '@/context';
import { LABELS } from '@/constants';
import { validateAmount, formatCurrency } from '@/utils';

const SettleUpModal = memo(({ isOpen, onClose, balance, groupId = null }) => {
  const { addPayment, users, currentUserId } = useApp();

  const [amount, setAmount] = useState(balance ? balance.amount.toString() : '');
  const [error, setError] = useState('');

  const isOwed = balance?.type === 'owes_you';
  const fromUser = isOwed ? users[balance?.userId] : users[balance?.userId];
  const toUser = isOwed ? users[balance?.userId] : users[balance?.userId];

  const maxAmount = balance ? balance.amount : 0;

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    setAmount(value);
    
    const amountError = validateAmount(value);
    if (amountError) {
      setError(amountError);
    } else if (parseFloat(value) > maxAmount) {
      setError(`Amount cannot exceed ${formatCurrency(maxAmount)}`);
    } else {
      setError('');
    }
  }, [maxAmount]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const amountError = validateAmount(amount);
    if (amountError) {
      setError(amountError);
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (paymentAmount > maxAmount) {
      setError(`Amount cannot exceed ${formatCurrency(maxAmount)}`);
      return;
    }

    const payment = {
      from: isOwed ? currentUserId : balance.userId,
      to: isOwed ? balance.userId : currentUserId,
      amount: paymentAmount,
      groupId,
    };

    addPayment(payment);
    onClose();
    setAmount('');
    setError('');
  }, [amount, balance, isOwed, maxAmount, groupId, currentUserId, addPayment, onClose]);

  const handleSettleFull = useCallback(() => {
    setAmount(maxAmount.toString());
    setError('');
  }, [maxAmount]);

  if (!balance) return null;

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {LABELS.CANCEL}
      </Button>
      <Button variant="success" onClick={handleSubmit} disabled={!!error || !amount}>
        Record Payment
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={LABELS.SETTLE_UP}
      size="md"
      footer={footer}
    >
      <div className="space-y-4">
        {/* Balance Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">
            {isOwed ? (
              <>
                <span className="font-semibold">{fromUser?.name}</span> owes you
              </>
            ) : (
              <>
                You owe <span className="font-semibold">{toUser?.name}</span>
              </>
            )}
          </p>
          <p className={`text-2xl font-bold ${isOwed ? 'text-success-600' : 'text-danger-600'}`}>
            {formatCurrency(maxAmount)}
          </p>
        </div>

        {/* Amount Input */}
        <form onSubmit={handleSubmit}>
          <Input
            label="Payment Amount"
            type="number"
            step="0.01"
            min="0"
            max={maxAmount}
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            error={error}
            required
            fullWidth
            icon={<span className="text-gray-500">$</span>}
          />

          {/* Quick Actions */}
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSettleFull}
            >
              Settle full amount
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAmount((maxAmount / 2).toFixed(2))}
            >
              Half amount
            </Button>
          </div>
        </form>

        {/* Info */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
          <p className="text-xs text-primary-900">
            💡 Recording a payment will create a payment entry and adjust balances accordingly.
          </p>
        </div>
      </div>
    </Modal>
  );
});

SettleUpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  balance: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['owes_you', 'you_owe']).isRequired,
  }),
  groupId: PropTypes.string,
};

SettleUpModal.displayName = 'SettleUpModal';

export default SettleUpModal;

