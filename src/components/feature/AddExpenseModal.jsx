import React, { memo, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Select } from '@/components/common';
import { useApp } from '@/context';
import { EXPENSE_CATEGORIES, DEFAULT_CATEGORY, SPLIT_TYPES, SPLIT_TYPE_LABELS, MESSAGES, LABELS } from '@/constants';
import { validateAmount, validateRequired, validateSplits, calculateSplits, toFixed } from '@/utils';

const AddExpenseModal = memo(({ isOpen, onClose, groupId = null }) => {
  const { users, addExpense, groups, currentUserId } = useApp();

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paidBy: currentUserId,
    category: DEFAULT_CATEGORY,
    splitType: SPLIT_TYPES.EQUAL,
    selectedMembers: [currentUserId],
    customSplits: {},
  });

  const [errors, setErrors] = useState({});

  // Get available members based on group
  const availableMembers = useMemo(() => {
    if (groupId && groups[groupId]) {
      return groups[groupId].members
        .map((memberId) => users[memberId])
        .filter(Boolean);
    }
    return Object.values(users);
  }, [groupId, groups, users]);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const toggleMember = useCallback((memberId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedMembers.includes(memberId);
      const newMembers = isSelected
        ? prev.selectedMembers.filter((id) => id !== memberId)
        : [...prev.selectedMembers, memberId];
      
      return { ...prev, selectedMembers: newMembers };
    });
  }, []);

  const handleCustomSplitChange = useCallback((userId, value) => {
    setFormData((prev) => ({
      ...prev,
      customSplits: {
        ...prev.customSplits,
        [userId]: parseFloat(value) || 0,
      },
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    const descError = validateRequired(formData.description);
    if (descError) newErrors.description = descError;

    const amountError = validateAmount(formData.amount);
    if (amountError) newErrors.amount = amountError;

    if (formData.selectedMembers.length === 0) {
      newErrors.members = MESSAGES.ERROR_NO_MEMBERS;
    }

    // Validate custom splits if not equal split
    if (formData.splitType !== SPLIT_TYPES.EQUAL) {
      const splits = calculateSplits(
        parseFloat(formData.amount),
        formData.selectedMembers,
        formData.splitType,
        formData.customSplits
      );
      const splitError = validateSplits(parseFloat(formData.amount), splits);
      if (splitError) newErrors.splits = splitError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const amount = parseFloat(formData.amount);
    const splits = calculateSplits(
      amount,
      formData.selectedMembers,
      formData.splitType,
      formData.customSplits
    );

    const expense = {
      description: formData.description.trim(),
      amount: toFixed(amount),
      paidBy: formData.paidBy,
      category: formData.category,
      groupId,
      splits,
    };

    addExpense(expense);
    onClose();
    
    // Reset form
    setFormData({
      description: '',
      amount: '',
      paidBy: currentUserId,
      category: DEFAULT_CATEGORY,
      splitType: SPLIT_TYPES.EQUAL,
      selectedMembers: [currentUserId],
      customSplits: {},
    });
    setErrors({});
  }, [formData, validateForm, addExpense, groupId, onClose, currentUserId]);

  const categoryOptions = useMemo(
    () => EXPENSE_CATEGORIES.map((cat) => ({
      value: cat.id,
      label: `${cat.icon} ${cat.name}`,
    })),
    []
  );

  const paidByOptions = useMemo(
    () => availableMembers.map((user) => ({
      value: user.id,
      label: user.id === currentUserId ? 'You' : user.name,
    })),
    [availableMembers, currentUserId]
  );

  const splitTypeOptions = useMemo(
    () => Object.entries(SPLIT_TYPE_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
    []
  );

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {LABELS.CANCEL}
      </Button>
      <Button onClick={handleSubmit}>
        {LABELS.ADD_EXPENSE}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={LABELS.ADD_EXPENSE}
      size="lg"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <Input
          label={LABELS.DESCRIPTION}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder={MESSAGES.PLACEHOLDER_DESCRIPTION}
          error={errors.description}
          required
          fullWidth
        />

        {/* Amount */}
        <Input
          label={LABELS.AMOUNT}
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          placeholder={MESSAGES.PLACEHOLDER_AMOUNT}
          error={errors.amount}
          required
          fullWidth
          icon={<span className="text-gray-500">$</span>}
        />

        {/* Paid By */}
        <Select
          label={LABELS.PAID_BY}
          value={formData.paidBy}
          onChange={(e) => handleInputChange('paidBy', e.target.value)}
          options={paidByOptions}
          required
          fullWidth
        />

        {/* Category */}
        <Select
          label={LABELS.CATEGORY}
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          options={categoryOptions}
          required
          fullWidth
        />

        {/* Split Type */}
        <Select
          label="Split Type"
          value={formData.splitType}
          onChange={(e) => handleInputChange('splitType', e.target.value)}
          options={splitTypeOptions}
          required
          fullWidth
        />

        {/* Members Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {LABELS.SPLIT_BETWEEN} <span className="text-danger-500">*</span>
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {availableMembers.map((user) => (
              <label
                key={user.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.selectedMembers.includes(user.id)}
                  onChange={() => toggleMember(user.id)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-900">
                  {user.id === currentUserId ? 'You' : user.name}
                </span>
              </label>
            ))}
          </div>
          {errors.members && (
            <p className="mt-1 text-sm text-danger-500">{errors.members}</p>
          )}
        </div>

        {/* Custom Splits (if not equal) */}
        {formData.splitType !== SPLIT_TYPES.EQUAL && formData.amount && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.splitType === SPLIT_TYPES.EXACT ? 'Enter amounts' : 'Enter percentages'}
            </label>
            <div className="space-y-2">
              {formData.selectedMembers.map((memberId) => {
                const user = users[memberId];
                return (
                  <Input
                    key={memberId}
                    label={user.id === currentUserId ? 'You' : user.name}
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.customSplits[memberId] || ''}
                    onChange={(e) => handleCustomSplitChange(memberId, e.target.value)}
                    fullWidth
                    icon={
                      <span className="text-gray-500">
                        {formData.splitType === SPLIT_TYPES.EXACT ? '$' : '%'}
                      </span>
                    }
                  />
                );
              })}
            </div>
            {errors.splits && (
              <p className="mt-2 text-sm text-danger-500">{errors.splits}</p>
            )}
          </div>
        )}
      </form>
    </Modal>
  );
});

AddExpenseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  groupId: PropTypes.string,
};

AddExpenseModal.displayName = 'AddExpenseModal';

export default AddExpenseModal;

