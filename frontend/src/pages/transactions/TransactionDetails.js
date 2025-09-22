import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Print,
  Download,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TransactionDetails = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { transactions } = useSelector((state) => state.transactions);
  
  const transaction = transactions?.find(tx => tx.id === transactionId);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBack = () => {
    navigate('/transactions');
  };

  if (!transaction) {
    return (
      <Box>
        <Typography variant="h6">Transaction not found</Typography>
        <Button onClick={handleBack} startIcon={<ArrowBack />}>
          Back to Transactions
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Transaction Details
        </Typography>
        <Button variant="outlined" startIcon={<Print />} sx={{ mr: 1 }}>
          Print
        </Button>
        <Button variant="outlined" startIcon={<Download />}>
          Download
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {transaction.type === 'credit' ? (
              <TrendingUp sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
            ) : (
              <TrendingDown sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
            )}
            <Box>
              <Typography variant="h5">
                {transaction.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transaction ID: {transaction.id}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Transaction Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Amount
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: transaction.type === 'credit' ? 'success.main' : 'error.main',
                    fontWeight: 'bold',
                  }}
                >
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(Math.abs(transaction.amount))}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Chip
                  label={transaction.type}
                  color={transaction.type === 'credit' ? 'success' : 'error'}
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Date & Time
                </Typography>
                <Typography variant="body1">
                  {formatDate(transaction.date)}
                </Typography>
              </Box>

              {transaction.reference && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Reference Number
                  </Typography>
                  <Typography variant="body1">
                    {transaction.reference}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Account
                </Typography>
                <Typography variant="body1">
                  Account ending in ****{transaction.accountId?.slice(-4)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Balance After Transaction
                </Typography>
                <Typography variant="h6" color="primary">
                  {formatCurrency(transaction.balance)}
                </Typography>
              </Box>

              {transaction.category && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {transaction.category}
                  </Typography>
                </Box>
              )}

              {transaction.notes && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="body1">
                    {transaction.notes}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionDetails;