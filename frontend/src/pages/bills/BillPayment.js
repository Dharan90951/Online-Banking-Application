import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  Payment,
  Receipt,
  Add,
  Edit,
  Delete,
  ElectricBolt,
  Water,
  Wifi,
  Phone,
  CreditCard,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBills, payBill } from '../../features/bills/billSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '../../utils/DateFnsAdapter';

const BillPayment = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);
  const { bills } = useSelector((state) => state.bills || { bills: [] });
  
  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);
  
  const [selectedBill, setSelectedBill] = useState('');
  const [paymentData, setPaymentData] = useState({
    fromAccount: '',
    amount: '',
    paymentDate: new Date(),
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [newBill, setNewBill] = useState({
    name: '',
    category: '',
    accountNumber: '',
    amount: '',
    dueDate: '',
  });

  // Mock bills data if not available in store
  const mockBills = [
    {
      id: '1',
      name: 'Electric Company',
      category: 'utilities',
      accountNumber: '123456789',
      amount: 125.50,
      dueDate: '2024-01-15',
      icon: 'electric',
    },
    {
      id: '2',
      name: 'Water Department',
      category: 'utilities',
      accountNumber: '987654321',
      amount: 85.25,
      dueDate: '2024-01-20',
      icon: 'water',
    },
    {
      id: '3',
      name: 'Internet Provider',
      category: 'telecom',
      accountNumber: '555123456',
      amount: 79.99,
      dueDate: '2024-01-10',
      icon: 'wifi',
    },
  ];

  const billsList = bills.length > 0 ? bills : mockBills;

  const getBillIcon = (iconType) => {
    switch (iconType) {
      case 'electric':
        return <ElectricBolt />;
      case 'water':
        return <Water />;
      case 'wifi':
        return <Wifi />;
      case 'phone':
        return <Phone />;
      case 'credit':
        return <CreditCard />;
      default:
        return <Receipt />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'utilities':
        return 'primary';
      case 'telecom':
        return 'secondary';
      case 'finance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleInputChange = (field) => (event) => {
    setPaymentData({
      ...paymentData,
      [field]: event.target.value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleBillSelect = (billId) => {
    const bill = billsList.find(b => b.id === billId);
    setSelectedBill(billId);
    setPaymentData({
      ...paymentData,
      amount: bill?.amount || '',
    });
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (!selectedBill) newErrors.bill = 'Please select a bill to pay';
    if (!paymentData.fromAccount) newErrors.fromAccount = 'Please select payment account';
    if (!paymentData.amount || paymentData.amount <= 0) newErrors.amount = 'Please enter valid amount';
    
    // Check sufficient balance
    const sourceAccount = accounts?.find(acc => acc.id === paymentData.fromAccount);
    if (sourceAccount && parseFloat(paymentData.amount) > sourceAccount.balance) {
      newErrors.amount = 'Insufficient balance';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dispatch the payment action
      dispatch(payBill({ 
        billId: selectedBill, 
        accountId: paymentData.fromAccount, 
        amount: paymentData.amount,
        paymentDate: paymentData.paymentDate,
        notes: paymentData.notes
      }));
      
      // Reset form
      setSelectedBill('');
      setPaymentData({
        fromAccount: '',
        amount: '',
        paymentDate: new Date(),
        notes: '',
      });
      
      // Show success message
      alert('Bill payment successful!');
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddBill = () => {
    // Here you would dispatch add bill action
    // dispatch(addBill(newBill));
    setShowAddBill(false);
    setNewBill({
      name: '',
      category: '',
      accountNumber: '',
      amount: '',
      dueDate: '',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const selectedBillData = billsList.find(b => b.id === selectedBill);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Bill Payment
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setShowAddBill(true)}
          >
            Add Bill
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Bills List */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Select Bill to Pay
                </Typography>
                
                <List>
                  {billsList.map((bill) => (
                    <ListItem
                      key={bill.id}
                      button
                      selected={selectedBill === bill.id}
                      onClick={() => handleBillSelect(bill.id)}
                      sx={{
                        border: selectedBill === bill.id ? 2 : 1,
                        borderColor: selectedBill === bill.id ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        {getBillIcon(bill.icon)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">
                              {bill.name}
                            </Typography>
                            <Chip
                              label={bill.category}
                              size="small"
                              color={getCategoryColor(bill.category)}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Account: {bill.accountNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Due: {formatDate(bill.dueDate)} • {formatCurrency(bill.amount)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IconButton size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Form */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Details
                </Typography>
                
                {errors.submit && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.submit}
                  </Alert>
                )}
                
                {selectedBillData && (
                  <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {getBillIcon(selectedBillData.icon)}
                      <Box>
                        <Typography variant="subtitle1">
                          {selectedBillData.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Account: {selectedBillData.accountNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                )}
                
                <FormControl fullWidth margin="normal" error={!!errors.fromAccount}>
                  <InputLabel>Pay From Account</InputLabel>
                  <Select
                    value={paymentData.fromAccount}
                    onChange={handleInputChange('fromAccount')}
                    label="Pay From Account"
                  >
                    {accounts?.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name} - {formatCurrency(account.balance)}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.fromAccount && (
                    <Typography variant="caption" color="error">
                      {errors.fromAccount}
                    </Typography>
                  )}
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={paymentData.amount}
                  onChange={handleInputChange('amount')}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  margin="normal"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Payment Date"
                    value={paymentData.paymentDate}
                    onChange={(newValue) => {
                      setPaymentData({
                        ...paymentData,
                        paymentDate: newValue,
                      });
                    }}
                    slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                  />
                </LocalizationProvider>
                
                <TextField
                  fullWidth
                  label="Notes (Optional)"
                  value={paymentData.notes}
                  onChange={handleInputChange('notes')}
                  margin="normal"
                  multiline
                  rows={2}
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handlePayment}
                  disabled={loading || !selectedBill}
                  startIcon={<Payment />}
                >
                  {loading ? 'Processing Payment...' : `Pay ${paymentData.amount ? formatCurrency(paymentData.amount) : ''}`}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Add Bill Dialog */}
        <Dialog open={showAddBill} onClose={() => setShowAddBill(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Bill</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Bill Name"
              value={newBill.name}
              onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={newBill.category}
                onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
                label="Category"
              >
                <MenuItem value="utilities">Utilities</MenuItem>
                <MenuItem value="telecom">Telecommunications</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
                <MenuItem value="insurance">Insurance</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Account Number"
              value={newBill.accountNumber}
              onChange={(e) => setNewBill({ ...newBill, accountNumber: e.target.value })}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Typical Amount"
              type="number"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={newBill.dueDate}
              onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddBill(false)}>Cancel</Button>
            <Button onClick={handleAddBill} variant="contained">Add Bill</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default BillPayment;