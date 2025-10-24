import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { generateId, sortExpensesByDate } from '@/utils';
import { generateMockData } from '@/utils/mockData';

const AppContext = createContext(null);

// Action types
const ACTIONS = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  ADD_GROUP: 'ADD_GROUP',
  UPDATE_GROUP: 'UPDATE_GROUP',
  DELETE_GROUP: 'DELETE_GROUP',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  ADD_PAYMENT: 'ADD_PAYMENT',
};

// Generate mock data
const mockData = generateMockData();

// Initial state with mock data
const initialState = {
  currentUserId: 'user1',
  users: mockData.users,
  groups: mockData.groups,
  expenses: sortExpensesByDate(mockData.expenses),
  payments: [],
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_EXPENSE:
      return {
        ...state,
        expenses: sortExpensesByDate([...state.expenses, action.payload]),
      };

    case ACTIONS.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: sortExpensesByDate(
          state.expenses.map((expense) =>
            expense.id === action.payload.id ? action.payload : expense
          )
        ),
      };

    case ACTIONS.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };

    case ACTIONS.ADD_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.id]: action.payload,
        },
      };

    case ACTIONS.UPDATE_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.id]: action.payload,
        },
      };

    case ACTIONS.DELETE_GROUP:
      return {
        ...state,
        groups: Object.fromEntries(
          Object.entries(state.groups).filter(([id]) => id !== action.payload)
        ),
        expenses: state.expenses.filter((expense) => expense.groupId !== action.payload),
      };

    case ACTIONS.ADD_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload,
        },
      };

    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload,
        },
      };

    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUserId: action.payload,
      };

    case ACTIONS.ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, action.payload],
        expenses: sortExpensesByDate([
          ...state.expenses,
          {
            id: generateId(),
            description: `Payment: ${state.users[action.payload.from]?.name} paid ${state.users[action.payload.to]?.name}`,
            amount: action.payload.amount,
            paidBy: action.payload.from,
            splits: [{ userId: action.payload.to, amount: action.payload.amount }],
            groupId: action.payload.groupId || null,
            category: 'other',
            date: action.payload.date,
            isPayment: true,
          },
        ]),
      };

    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Expense actions
  const addExpense = useCallback((expense) => {
    const newExpense = {
      ...expense,
      id: generateId(),
      date: expense.date || new Date().toISOString(),
    };
    dispatch({ type: ACTIONS.ADD_EXPENSE, payload: newExpense });
  }, []);

  const updateExpense = useCallback((expense) => {
    dispatch({ type: ACTIONS.UPDATE_EXPENSE, payload: expense });
  }, []);

  const deleteExpense = useCallback((expenseId) => {
    dispatch({ type: ACTIONS.DELETE_EXPENSE, payload: expenseId });
  }, []);

  // Group actions
  const addGroup = useCallback((group) => {
    const newGroup = {
      ...group,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: ACTIONS.ADD_GROUP, payload: newGroup });
    return newGroup.id;
  }, []);

  const updateGroup = useCallback((group) => {
    dispatch({ type: ACTIONS.UPDATE_GROUP, payload: group });
  }, []);

  const deleteGroup = useCallback((groupId) => {
    dispatch({ type: ACTIONS.DELETE_GROUP, payload: groupId });
  }, []);

  // User actions
  const addUser = useCallback((user) => {
    const newUser = {
      ...user,
      id: generateId(),
    };
    dispatch({ type: ACTIONS.ADD_USER, payload: newUser });
    return newUser.id;
  }, []);

  const updateUser = useCallback((user) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: user });
  }, []);

  const setCurrentUser = useCallback((userId) => {
    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: userId });
  }, []);

  // Payment actions
  const addPayment = useCallback((payment) => {
    const newPayment = {
      ...payment,
      id: generateId(),
      date: payment.date || new Date().toISOString(),
    };
    dispatch({ type: ACTIONS.ADD_PAYMENT, payload: newPayment });
  }, []);

  // Memoized value
  const value = useMemo(
    () => ({
      ...state,
      addExpense,
      updateExpense,
      deleteExpense,
      addGroup,
      updateGroup,
      deleteGroup,
      addUser,
      updateUser,
      setCurrentUser,
      addPayment,
    }),
    [
      state,
      addExpense,
      updateExpense,
      deleteExpense,
      addGroup,
      updateGroup,
      deleteGroup,
      addUser,
      updateUser,
      setCurrentUser,
      addPayment,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

