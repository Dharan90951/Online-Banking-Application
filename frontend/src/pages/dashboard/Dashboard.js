import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
} from '@mui/material';
import {
  AccountBalance,
  ArrowUpward,
  ArrowDownward,
  Payment,
  Receipt,
  CreditCard,
  TrendingUp,
  AttachMoney,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // This would normally come from Redux state
  const accounts = [
    { id: 1, name: 'Checking Account', balance: 2543.87, accountNumber: '****4567' },
    { id: 2, name: 'Savings Account', balance: 15750.52, accountNumber: '****7890' },
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -78.35, date: '2024-07-25', type: 'debit' },
    { id: 2, description: 'Salary Deposit', amount: 3500.00, date: '2024-07-24', type: 'credit' },
    { id: 3, description: 'Electric Bill', amount: -145.30, date: '2024-07-23', type: 'debit' },
    { id: 4, description: 'Online Shopping', amount: -65.99, date: '2024-07-22', type: 'debit' },
  ];

  const upcomingBills = [
    { id: 1, name: 'Rent', amount: 1200.00, dueDate: '2024-08-01' },
    { id: 2, name: 'Internet', amount: 79.99, dueDate: '2024-08-05' },
    { id: 3, name: 'Phone Bill', amount: 85.00, dueDate: '2024-08-10' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Account Summary */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Account Summary
          </Typography>
          <Button
            component={Link}
            to="/accounts"
            variant="outlined"
            size="small"
          >
            View All Accounts
          </Button>
        </Box>

        <Grid container spacing={3}>
          {accounts.map((account) => (
            <Grid item xs={12} md={6} key={account.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccountBalance color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h3">
                      {account.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Account: {account.accountNumber}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/accounts/${account.id}`}
                    size="small"
                  >
                    Details
                  </Button>
                  <Button
                    component={Link}
                    to="/transfer"
                    size="small"
                  >
                    Transfer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Recent Transactions */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Recent Transactions
              </Typography>
              <Button
                component={Link}
                to="/transactions"
                variant="outlined"
                size="small"
              >
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recentTransactions.map((transaction) => (
                <ListItem
                  key={transaction.id}
                  component={Link}
                  to={`/transactions/${transaction.id}`}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor: transaction.type === 'credit' ? 'success.light' : 'error.light',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {transaction.type === 'credit' ? <ArrowUpward /> : <ArrowDownward />}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={transaction.description}
                    secondary={new Date(transaction.date).toLocaleDateString()}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: transaction.type === 'credit' ? 'success.main' : 'error.main',
                    }}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}
                    ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Bills */}
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Upcoming Bills
              </Typography>
              <Button
                component={Link}
                to="/bills/manage"
                variant="outlined"
                size="small"
              >
                Manage Bills
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {upcomingBills.map((bill) => (
                <ListItem
                  key={bill.id}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.light',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Receipt />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={bill.name}
                    secondary={`Due: ${new Date(bill.dueDate).toLocaleDateString()}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography variant="body2" fontWeight="bold">
                      ${bill.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                    <Button
                      component={Link}
                      to="/bills/pay"
                      size="small"
                      variant="contained"
                      sx={{ mt: 1 }}
                    >
                      Pay
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6} sm={3}>
            <Card
              component={Link}
              to="/transfer"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  width: 56,
                  height: 56,
                  mb: 1,
                }}
              >
                <AttachMoney />
              </Avatar>
              <Typography variant="body1" textAlign="center">
                Transfer Money
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              component={Link}
              to="/bills/pay"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'warning.light',
                  width: 56,
                  height: 56,
                  mb: 1,
                }}
              >
                <Payment />
              </Avatar>
              <Typography variant="body1" textAlign="center">
                Pay Bills
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              component={Link}
              to="/accounts"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'success.light',
                  width: 56,
                  height: 56,
                  mb: 1,
                }}
              >
                <CreditCard />
              </Avatar>
              <Typography variant="body1" textAlign="center">
                Manage Accounts
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              component={Link}
              to="/transactions"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'info.light',
                  width: 56,
                  height: 56,
                  mb: 1,
                }}
              >
                <TrendingUp />
              </Avatar>
              <Typography variant="body1" textAlign="center">
                View Transactions
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;