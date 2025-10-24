import { SPLIT_TYPES } from '@/constants';
import { toFixed } from './formatters';

/**
 * Generates a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate split amounts based on split type
 * @param {number} totalAmount - Total expense amount
 * @param {Array} selectedMembers - Array of member IDs
 * @param {string} splitType - Type of split (equal, exact, percentage)
 * @param {Object} customSplits - Custom split amounts/percentages
 * @returns {Array} Array of split objects
 */
export const calculateSplits = (
  totalAmount,
  selectedMembers,
  splitType = SPLIT_TYPES.EQUAL,
  customSplits = {}
) => {
  const splits = [];

  if (splitType === SPLIT_TYPES.EQUAL) {
    const amountPerPerson = totalAmount / selectedMembers.length;
    
    selectedMembers.forEach((userId, index) => {
      // Handle rounding by giving the remainder to the last person
      let amount;
      if (index === selectedMembers.length - 1) {
        const previousTotal = amountPerPerson * index;
        amount = toFixed(totalAmount - previousTotal);
      } else {
        amount = toFixed(amountPerPerson);
      }

      splits.push({ userId, amount });
    });
  } else if (splitType === SPLIT_TYPES.EXACT) {
    selectedMembers.forEach((userId) => {
      const amount = toFixed(customSplits[userId] || 0);
      splits.push({ userId, amount });
    });
  } else if (splitType === SPLIT_TYPES.PERCENTAGE) {
    selectedMembers.forEach((userId, index) => {
      const percentage = customSplits[userId] || 0;
      let amount;
      
      if (index === selectedMembers.length - 1) {
        // Give remainder to last person to handle rounding
        const previousTotal = splits.reduce((sum, s) => sum + s.amount, 0);
        amount = toFixed(totalAmount - previousTotal);
      } else {
        amount = toFixed((totalAmount * percentage) / 100);
      }
      
      splits.push({ userId, amount });
    });
  }

  return splits;
};

/**
 * Get category by ID
 * @param {Array} categories - Array of category objects
 * @param {string} categoryId - Category ID
 * @returns {Object|null} Category object or null
 */
export const getCategoryById = (categories, categoryId) => {
  return categories.find((cat) => cat.id === categoryId) || null;
};

/**
 * Filter expenses by group
 * @param {Array} expenses - Array of expense objects
 * @param {string} groupId - Group ID
 * @returns {Array} Filtered expenses
 */
export const filterExpensesByGroup = (expenses, groupId) => {
  if (!groupId) return expenses;
  return expenses.filter((expense) => expense.groupId === groupId);
};

/**
 * Filter expenses by date range
 * @param {Array} expenses - Array of expense objects
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered expenses
 */
export const filterExpensesByDateRange = (expenses, startDate, endDate) => {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });
};

/**
 * Sort expenses by date (newest first)
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Sorted expenses
 */
export const sortExpensesByDate = (expenses) => {
  return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Group expenses by date
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} Expenses grouped by date
 */
export const groupExpensesByDate = (expenses) => {
  const grouped = {};
  
  expenses.forEach((expense) => {
    const date = new Date(expense.date).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(expense);
  });

  return grouped;
};

/**
 * Calculate total expenses
 * @param {Array} expenses - Array of expense objects
 * @returns {number} Total amount
 */
export const calculateTotalExpenses = (expenses) => {
  return toFixed(expenses.reduce((sum, expense) => sum + expense.amount, 0));
};

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

