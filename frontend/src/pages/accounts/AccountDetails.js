import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Download,
  Print,
  AccountBalance,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountDetails = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const { accounts } = useSelector((state) => state.accounts);
  const { transactions } = useSelector((state) => state.transactions);
  
  const [account, setAccount] = useState(null);
  const [accountTransactions, setAccountTransactions] = useState([]);

  useEffect(() => {
    // Find the account by ID
    const foundAccount = accounts?.find(acc => acc.id === accountId);
    setAccount(foundAccount);
    
    // Filter transactions for this account
    const filteredTransactions = transactions?.filter(
      tx => tx.accountId === accountId
    ) || [];
    setAccountTransactions(filteredTransactions);
  }, [accountId, accounts, transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTransactionIcon = (type) => {
    return type === 'credit' ? (
      <TrendingUp color="success" />
    ) : (
      <TrendingDown color="error" />
    );
  };

  const getAccountTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'checking':
        return 'primary';
      case 'savings':
        return 'success';
      case 'credit':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleBack = () => {
    navigate('/accounts');
  };

  const handleDownload = () => {
    console.log('Download statement');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!account) {
    return (
      <Box>
        <Typography variant="h6">Account not found</Typography>
        <Button onClick={handleBack} startIcon={<ArrowBack />}>
          Back to Accounts
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
          Account Details
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleDownload}
          sx={{ mr: 1 }}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={handlePrint}
        >
          Print
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccountBalance sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h5" component="div">
                {account.accountName || `${account.accountType} Account`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Account Number: ****{account.accountNumber?.slice(-4)}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" color="primary">
                {formatCurrency(account.balance || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Balance
              </Typography>
            </Box>
            <Chip
              label={account.accountType}
              color={getAccountTypeColor(account.accountType)}
              size="medium"
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          
          {accountTransactions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No transactions found for this account
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getTransactionIcon(transaction.type)}
                          <Box sx={{ ml: 1 }}>
                            <Typography variant="body2">
                              {transaction.description}
                            </Typography>
                            {transaction.reference && (
                              <Typography variant="caption" color="text.secondary">
                                Ref: {transaction.reference}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.type}
                          color={transaction.type === 'credit' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: transaction.type === 'credit' ? 'success.main' : 'error.main',
                          fontWeight: 'bold',
                        }}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(transaction.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountDetails;