import { toFixed } from './formatters';

/**
 * Calculate net balances for all users
 * @param {Array} expenses - Array of expense objects
 * @param {string} currentUserId - Current user's ID
 * @returns {Object} Net balances for each user
 */
export const calculateNetBalances = (expenses, currentUserId) => {
  const balances = {};

  expenses.forEach((expense) => {
    const { paidBy, splits } = expense;

    // Initialize paidBy user balance if not exists
    if (!balances[paidBy]) {
      balances[paidBy] = 0;
    }

    // Process each split
    splits.forEach((split) => {
      const { userId, amount } = split;

      // Initialize user balance if not exists
      if (!balances[userId]) {
        balances[userId] = 0;
      }

      // If this user paid for someone else, they are owed
      if (paidBy !== userId) {
        balances[paidBy] += amount;
        balances[userId] -= amount;
      }
    });
  });

  return balances;
};

/**
 * Simplify debts to minimize number of transactions
 * Uses greedy algorithm to match largest creditor with largest debtor
 * @param {Object} balances - Net balances for each user
 * @param {Object} users - User objects map
 * @returns {Array} Simplified debt transactions
 */
export const simplifyDebts = (balances, users) => {
  // Create arrays of creditors (positive balance) and debtors (negative balance)
  const creditors = [];
  const debtors = [];

  Object.entries(balances).forEach(([userId, balance]) => {
    const roundedBalance = toFixed(balance);
    
    if (roundedBalance > 0) {
      creditors.push({ userId, amount: roundedBalance });
    } else if (roundedBalance < 0) {
      debtors.push({ userId, amount: Math.abs(roundedBalance) });
    }
  });

  // Sort in descending order
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let i = 0;
  let j = 0;

  // Match creditors with debtors
  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];

    const amount = Math.min(creditor.amount, debtor.amount);

    if (amount > 0.01) { // Only create transaction if amount is significant
      transactions.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: toFixed(amount),
        fromName: users[debtor.userId]?.name || 'Unknown',
        toName: users[creditor.userId]?.name || 'Unknown',
      });
    }

    creditor.amount = toFixed(creditor.amount - amount);
    debtor.amount = toFixed(debtor.amount - amount);

    if (creditor.amount === 0) i++;
    if (debtor.amount === 0) j++;
  }

  return transactions;
};

/**
 * Calculate balance between current user and all others
 * @param {Object} balances - Net balances
 * @param {string} currentUserId - Current user's ID
 * @param {Object} users - User objects map
 * @returns {Array} Array of balance objects
 */
export const getUserBalances = (balances, currentUserId, users) => {
  const userBalances = [];

  Object.entries(balances).forEach(([userId, balance]) => {
    if (userId === currentUserId || Math.abs(balance) < 0.01) return;

    const roundedBalance = toFixed(balance);
    
    userBalances.push({
      userId,
      userName: users[userId]?.name || 'Unknown',
      amount: Math.abs(roundedBalance),
      type: roundedBalance > 0 ? 'owes_you' : 'you_owe',
    });
  });

  // Sort by amount descending
  return userBalances.sort((a, b) => b.amount - a.amount);
};

/**
 * Calculate total amount user owes
 * @param {Object} balances - Net balances
 * @param {string} userId - User ID
 * @returns {number} Total amount owed by user
 */
export const getTotalOwed = (balances, userId) => {
  const balance = balances[userId] || 0;
  return balance < 0 ? toFixed(Math.abs(balance)) : 0;
};

/**
 * Calculate total amount owed to user
 * @param {Object} balances - Net balances
 * @param {string} userId - User ID
 * @returns {number} Total amount owed to user
 */
export const getTotalOwing = (balances, userId) => {
  const balance = balances[userId] || 0;
  return balance > 0 ? toFixed(balance) : 0;
};

/**
 * Get balance summary for user
 * @param {Object} balances - Net balances
 * @param {string} userId - User ID
 * @returns {Object} Balance summary
 */
export const getBalanceSummary = (balances, userId) => {
  const balance = balances[userId] || 0;
  const roundedBalance = toFixed(balance);

  return {
    totalOwed: getTotalOwed(balances, userId),
    totalOwing: getTotalOwing(balances, userId),
    netBalance: roundedBalance,
    isSettled: Math.abs(roundedBalance) < 0.01,
  };
};

