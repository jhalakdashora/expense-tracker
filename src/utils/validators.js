import { MESSAGES } from '@/constants';

/**
 * Validates if a value is empty
 * @param {*} value - Value to validate
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Validates required field
 * @param {*} value - Value to validate
 * @returns {string|null} Error message or null
 */
export const validateRequired = (value) => {
  return isEmpty(value) ? MESSAGES.ERROR_REQUIRED_FIELD : null;
};

/**
 * Validates amount field
 * @param {*} value - Value to validate
 * @returns {string|null} Error message or null
 */
export const validateAmount = (value) => {
  if (isEmpty(value)) return MESSAGES.ERROR_REQUIRED_FIELD;
  
  const amount = Number(value);
  if (isNaN(amount) || amount <= 0) {
    return MESSAGES.ERROR_INVALID_AMOUNT;
  }
  
  return null;
};

/**
 * Validates split amounts equal total
 * @param {number} total - Total amount
 * @param {Array} splits - Array of split objects with amount
 * @returns {string|null} Error message or null
 */
export const validateSplits = (total, splits) => {
  if (!splits || splits.length === 0) {
    return MESSAGES.ERROR_NO_MEMBERS;
  }

  const splitTotal = splits.reduce((sum, split) => sum + (split.amount || 0), 0);
  const difference = Math.abs(total - splitTotal);

  // Allow small floating point differences
  if (difference > 0.01) {
    return MESSAGES.ERROR_INVALID_SPLIT;
  }

  return null;
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates percentage (0-100)
 * @param {number} value - Value to validate
 * @returns {boolean} True if valid percentage
 */
export const isValidPercentage = (value) => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && num <= 100;
};

