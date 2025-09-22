import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Accounts from './pages/accounts/Accounts';
import AccountDetails from './pages/accounts/AccountDetails';
import Transactions from './pages/transactions/Transactions';
import TransactionDetails from './pages/transactions/TransactionDetails';
import Transfer from './pages/transfers/Transfer';
import Bills from './pages/bills/Bills';
import BillPayment from './pages/bills/BillPayment';
import BillManagement from './pages/bills/BillManagement';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

// Error pages
import NotFound from './pages/errors/NotFound';

// Auth actions
import { checkAuth } from './features/auth/authSlice';

/**
 * Main App component that handles routing and authentication state.
 */
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Check authentication status on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:id" element={<AccountDetails />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/bills/pay" element={<BillPayment />} />
        <Route path="/bills/manage" element={<BillManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Error routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;