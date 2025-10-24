/**
 * Generate mock data for testing the application
 */
export const generateMockData = () => {

  // Mock users
  const users = {
    user1: { id: 'user1', name: 'You', email: 'you@example.com', avatar: '👤' },
    user2: { id: 'user2', name: 'Himanshu', email: 'alice@example.com', avatar: '👨' },
    user3: { id: 'user3', name: 'Niket', email: 'bob@example.com', avatar: '👨' },
    user4: { id: 'user4', name: 'Anshuman', email: 'charlie@example.com', avatar: '👨' },
    user5: { id: 'user5', name: 'Swaraj', email: 'diana@example.com', avatar: '👨' },
  };
  const groups = {
  };

  // Mock expenses
  const expenses = [];

  return { users, groups, expenses };
};

