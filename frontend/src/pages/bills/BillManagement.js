import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Alert,
  Grid,
  Fab,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Payment,
  Schedule,
  Pause,
  PlayArrow,
  ElectricBolt,
  Water,
  Wifi,
  Phone,
  CreditCard,
  Receipt,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBills, createBill, updateBill, deleteBill } from '../../features/bills/billSlice';

const BillManagement = () => {
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.bills || { bills: [] });
  const { accounts } = useSelector((state) => state.accounts);
  
  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'add', 'edit', 'delete'
  const [billData, setBillData] = useState({
    name: '',
    category: '',
    accountNumber: '',
    amount: '',
    dueDate: '',
    frequency: 'monthly',
    autoPayEnabled: false,
    autoPayAccount: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  // Mock bills data if not available in store
  const mockBills = [
    {
      id: '1',
      name: 'Electric Company',
      category: 'utilities',
      accountNumber: '123456789',
      amount: 125.50,
      dueDate: '15',
      frequency: 'monthly',
      autoPayEnabled: true,
      autoPayAccount: 'acc1',
      status: 'active',
      nextDue: '2024-01-15',
      icon: 'electric',
    },
    {
      id: '2',
      name: 'Water Department',
      category: 'utilities',
      accountNumber: '987654321',
      amount: 85.25,
      dueDate: '20',
      frequency: 'monthly',
      autoPayEnabled: false,
      status: 'active',
      nextDue: '2024-01-20',
      icon: 'water',
    },
    {
      id: '3',
      name: 'Internet Provider',
      category: 'telecom',
      accountNumber: '555123456',
      amount: 79.99,
      dueDate: '10',
      frequency: 'monthly',
      autoPayEnabled: true,
      autoPayAccount: 'acc2',
      status: 'paused',
      nextDue: '2024-01-10',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event, bill) => {
    setAnchorEl(event.currentTarget);
    setSelectedBill(bill);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBill(null);
  };

  const handleDialogOpen = (type, bill = null) => {
    setDialogType(type);
    if (bill) {
      setBillData({
        name: bill.name,
        category: bill.category,
        accountNumber: bill.accountNumber,
        amount: bill.amount,
        dueDate: bill.dueDate,
        frequency: bill.frequency,
        autoPayEnabled: bill.autoPayEnabled,
        autoPayAccount: bill.autoPayAccount || '',
        notes: bill.notes || '',
      });
    } else {
      setBillData({
        name: '',
        category: '',
        accountNumber: '',
        amount: '',
        dueDate: '',
        frequency: 'monthly',
        autoPayEnabled: false,
        autoPayAccount: '',
        notes: '',
      });
    }
    setShowDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setErrors({});
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setBillData({
      ...billData,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateBill = () => {
    const newErrors = {};
    
    if (!billData.name) newErrors.name = 'Bill name is required';
    if (!billData.category) newErrors.category = 'Category is required';
    if (!billData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!billData.amount || billData.amount <= 0) newErrors.amount = 'Valid amount is required';
    if (!billData.dueDate) newErrors.dueDate = 'Due date is required';
    if (billData.autoPayEnabled && !billData.autoPayAccount) {
      newErrors.autoPayAccount = 'Auto-pay account is required when auto-pay is enabled';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateBill()) return;
    
    if (dialogType === 'add') {
      dispatch(createBill(billData));
    } else if (dialogType === 'edit') {
      dispatch(updateBill({ id: selectedBill.id, ...billData }));
    }
    
    handleDialogClose();
  };

  const handleDelete = () => {
    dispatch(deleteBill(selectedBill.id));
    handleDialogClose();
  };

  const handleToggleStatus = (bill) => {
    const newStatus = bill.status === 'active' ? 'paused' : 'active';
    dispatch(updateBill({ id: bill.id, status: newStatus }));
  };

  const handlePayNow = (bill) => {
    // Navigate to payment page with pre-filled bill data
    window.location.href = `/bills/pay?billId=${bill.id}`;
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
      year: 'numeric',
    });
  };

  const getAccountName = (accountId) => {
    const account = accounts?.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Bill Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleDialogOpen('add')}
        >
          Add Bill
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {billsList.filter(b => b.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Bills
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {billsList.filter(b => b.autoPayEnabled).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Auto-Pay Enabled
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {formatCurrency(billsList.reduce((sum, bill) => sum + bill.amount, 0))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error.main">
                {billsList.filter(b => new Date(b.nextDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due This Week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bills Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bill</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Next Due</TableCell>
                  <TableCell>Auto-Pay</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billsList.map((bill) => (
                  <TableRow key={bill.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {getBillIcon(bill.icon)}
                        <Box>
                          <Typography variant="subtitle2">
                            {bill.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {bill.accountNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={bill.category}
                        size="small"
                        color={getCategoryColor(bill.category)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {formatCurrency(bill.amount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {bill.frequency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(bill.nextDue)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {bill.autoPayEnabled ? (
                        <Box>
                          <Chip label="Enabled" size="small" color="success" />
                          <Typography variant="caption" display="block" color="text.secondary">
                            {getAccountName(bill.autoPayAccount)}
                          </Typography>
                        </Box>
                      ) : (
                        <Chip label="Disabled" size="small" color="default" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={bill.status}
                        size="small"
                        color={getStatusColor(bill.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handlePayNow(bill)}
                          color="primary"
                        >
                          <Payment fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleStatus(bill)}
                          color={bill.status === 'active' ? 'warning' : 'success'}
                        >
                          {bill.status === 'active' ? (
                            <Pause fontSize="small" />
                          ) : (
                            <PlayArrow fontSize="small" />
                          )}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, bill)}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDialogOpen('edit', selectedBill)}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('delete', selectedBill)}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog && (dialogType === 'add' || dialogType === 'edit')} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? 'Add New Bill' : 'Edit Bill'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bill Name"
                value={billData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={billData.category}
                  onChange={handleInputChange('category')}
                  label="Category"
                >
                  <MenuItem value="utilities">Utilities</MenuItem>
                  <MenuItem value="telecom">Telecommunications</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="insurance">Insurance</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={billData.accountNumber}
                onChange={handleInputChange('accountNumber')}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={billData.amount}
                onChange={handleInputChange('amount')}
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date (Day of Month)"
                type="number"
                value={billData.dueDate}
                onChange={handleInputChange('dueDate')}
                error={!!errors.dueDate}
                helperText={errors.dueDate}
                inputProps={{ min: 1, max: 31 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={billData.frequency}
                  onChange={handleInputChange('frequency')}
                  label="Frequency"
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="annually">Annually</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={billData.autoPayEnabled}
                    onChange={handleInputChange('autoPayEnabled')}
                  />
                }
                label="Enable Auto-Pay"
              />
            </Grid>
            {billData.autoPayEnabled && (
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.autoPayAccount}>
                  <InputLabel>Auto-Pay Account</InputLabel>
                  <Select
                    value={billData.autoPayAccount}
                    onChange={handleInputChange('autoPayAccount')}
                    label="Auto-Pay Account"
                  >
                    {accounts?.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name} - {account.accountNumber}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.autoPayAccount && (
                    <Typography variant="caption" color="error">
                      {errors.autoPayAccount}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes (Optional)"
                value={billData.notes}
                onChange={handleInputChange('notes')}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {dialogType === 'add' ? 'Add Bill' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDialog && dialogType === 'delete'} onClose={handleDialogClose}>
        <DialogTitle>Delete Bill</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone.
          </Alert>
          <Typography>
            Are you sure you want to delete the bill "{selectedBill?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add bill"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleDialogOpen('add')}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default BillManagement;