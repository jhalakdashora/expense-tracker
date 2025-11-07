import React, { memo, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from '@/components/common';
import { useApp } from '@/context';
import { LABELS, MESSAGES } from '@/constants';
import { validateRequired } from '@/utils';

const AddGroupModal = memo(({ isOpen, onClose }) => {
  const { users, addGroup, currentUserId } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    selectedMembers: [currentUserId],
    simplifyDebts: true,
  });

  const [errors, setErrors] = useState({});

  const availableUsers = useMemo(() => Object.values(users), [users]);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const toggleMember = useCallback((userId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedMembers.includes(userId);
      
      // Don't allow deselecting current user
      if (userId === currentUserId && isSelected) return prev;
      
      const newMembers = isSelected
        ? prev.selectedMembers.filter((id) => id !== userId)
        : [...prev.selectedMembers, userId];
      
      return { ...prev, selectedMembers: newMembers };
    });
  }, [currentUserId]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    const nameError = validateRequired(formData.name);
    if (nameError) newErrors.name = nameError;

    if (formData.selectedMembers.length < 2) {
      newErrors.members = 'Select at least 2 members';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const group = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      members: formData.selectedMembers,
      simplifyDebts: formData.simplifyDebts,
    };

    addGroup(group);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      selectedMembers: [currentUserId],
      simplifyDebts: true,
    });
    setErrors({});
  }, [formData, validateForm, addGroup, onClose, currentUserId]);

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {LABELS.CANCEL}
      </Button>
      <Button onClick={handleSubmit}>
        Create Group
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Group"
      size="md"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Group Name */}
        <Input
          label="Group Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder={MESSAGES.PLACEHOLDER_GROUP_NAME}
          error={errors.name}
          required
          fullWidth
        />

        {/* Description */}
        <Input
          label="Description (Optional)"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="e.g., Weekend trip to mountains"
          fullWidth
        />

        {/* Members Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Members <span className="text-danger-500">*</span>
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {availableUsers.map((user) => {
              const isCurrentUser = user.id === currentUserId;
              const isSelected = formData.selectedMembers.includes(user.id);
              
              return (
                <label
                  key={user.id}
                  className={`flex items-center gap-3 p-2 rounded ${
                    isCurrentUser ? 'bg-primary-50' : 'hover:bg-gray-50'
                  } ${isCurrentUser ? '' : 'cursor-pointer'}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleMember(user.id)}
                    disabled={isCurrentUser}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 disabled:opacity-50"
                  />
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <span>{user.avatar}</span>
                    <span>{isCurrentUser ? 'You' : user.name}</span>
                    {isCurrentUser && (
                      <span className="text-xs text-primary-600">(required)</span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.members && (
            <p className="mt-1 text-sm text-danger-500">{errors.members}</p>
          )}
        </div>

        {/* Simplify Debts Toggle */}
        <div className="border-t border-gray-200 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.simplifyDebts}
              onChange={(e) => handleInputChange('simplifyDebts', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900 block">
                Simplify Debts
              </span>
              <span className="text-xs text-gray-600 block mt-1">
                Automatically minimize the number of transactions needed to settle all debts in this group
              </span>
            </div>
          </label>
        </div>
      </form>
    </Modal>
  );
});

AddGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

AddGroupModal.displayName = 'AddGroupModal';

export default AddGroupModal;

