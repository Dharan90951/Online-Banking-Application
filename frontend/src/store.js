import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './features/auth/authSlice';
import accountReducer from './features/accounts/accountSlice';
import transactionReducer from './features/transactions/transactionSlice';
import billReducer from './features/bills/billSlice';
import notificationReducer from './features/notifications/notificationSlice';
import uiReducer from './features/ui/uiSlice';

/**
 * Configure Redux store with all application reducers
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
    bills: billReducer,
    notifications: notificationReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user.createdAt', 'auth.user.updatedAt'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;