import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
} from '@mui/material';
import {
  Payment,
  Receipt,
  Schedule,
  AttachMoney,
  ManageAccounts,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Bills = () => {
  // Mock data for upcoming bills
  const upcomingBills = [
    { id: 1, name: 'Rent', amount: 1200.00, dueDate: '2024-08-01', status: 'pending' },
    { id: 2, name: 'Internet', amount: 79.99, dueDate: '2024-08-05', status: 'pending' },
    { id: 3, name: 'Phone Bill', amount: 85.00, dueDate: '2024-08-10', status: 'pending' },
    { id: 4, name: 'Electric Bill', amount: 145.30, dueDate: '2024-08-15', status: 'pending' },
  ];

  // Mock data for recent bill payments
  const recentPayments = [
    { id: 1, name: 'Water Bill', amount: 65.50, paidDate: '2024-07-20', status: 'paid' },
    { id: 2, name: 'Gas Bill', amount: 89.25, paidDate: '2024-07-18', status: 'paid' },
    { id: 3, name: 'Credit Card', amount: 250.00, paidDate: '2024-07-15', status: 'paid' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bills & Payments
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage your bills, schedule payments, and view payment history
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Payment sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Pay Bills</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Make one-time payments or set up recurring payments for your bills
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/bills/pay"
                variant="contained"
                startIcon={<Payment />}
                fullWidth
              >
                Pay Bills
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ManageAccounts sx={{ mr: 2, color: 'secondary.main' }} />
                <Typography variant="h6">Manage Bills</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Add, edit, or remove payees and manage your bill payment settings
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/bills/manage"
                variant="outlined"
                startIcon={<ManageAccounts />}
                fullWidth
              >
                Manage Bills
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Bills */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Bills
            </Typography>
            <List>
              {upcomingBills.map((bill, index) => (
                <React.Fragment key={bill.id}>
                  <ListItem
                    sx={{
                      px: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Schedule color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={bill.name}
                        secondary={`Due: ${formatDate(bill.dueDate)}`}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" color="text.primary">
                        {formatCurrency(bill.amount)}
                      </Typography>
                      <Chip
                        label={bill.status}
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </ListItem>
                  {index < upcomingBills.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                component={Link}
                to="/bills/pay"
                variant="contained"
                size="small"
              >
                Pay All Bills
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Payments */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Payments
            </Typography>
            <List>
              {recentPayments.map((payment, index) => (
                <React.Fragment key={payment.id}>
                  <ListItem
                    sx={{
                      px: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Receipt color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={payment.name}
                        secondary={`Paid: ${formatDate(payment.paidDate)}`}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" color="text.primary">
                        {formatCurrency(payment.amount)}
                      </Typography>
                      <Chip
                        label={payment.status}
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </ListItem>
                  {index < recentPayments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                component={Link}
                to="/bills/manage"
                variant="outlined"
                size="small"
              >
                View All Payments
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Bills;