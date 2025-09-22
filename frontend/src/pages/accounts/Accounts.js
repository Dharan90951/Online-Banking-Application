import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import { Add, AccountBalance } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accounts, loading } = useSelector((state) => state.accounts);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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

  const handleAccountClick = (accountId) => {
    navigate(`/accounts/${accountId}`);
  };

  const handleAddAccount = () => {
    // Navigate to add account page or open modal
    console.log('Add new account');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Accounts
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddAccount}
        >
          Add Account
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading accounts...</Typography>
      ) : (
        <Grid container spacing={3}>
          {accounts?.map((account) => (
            <Grid item xs={12} md={6} lg={4} key={account.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleAccountClick(account.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="div">
                      {account.accountName || `${account.accountType} Account`}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Account Number: ****{account.accountNumber?.slice(-4)}
                    </Typography>
                    <Chip
                      label={account.accountType}
                      color={getAccountTypeColor(account.accountType)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" component="div" color="primary">
                    {formatCurrency(account.balance || 0)}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Available Balance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) || (
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <AccountBalance sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No accounts found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Get started by adding your first account
                  </Typography>
                  <Button variant="contained" startIcon={<Add />} onClick={handleAddAccount}>
                    Add Account
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Accounts;