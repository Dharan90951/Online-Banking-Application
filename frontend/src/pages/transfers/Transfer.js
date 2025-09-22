import React, { useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
} from '@mui/material';
import {
  Send,
  AccountBalance,
  SwapHoriz,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  
  const [activeStep, setActiveStep] = useState(0);
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    transferType: 'internal', // internal, external
    recipientName: '',
    recipientAccountNumber: '',
    recipientBankCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = ['Transfer Details', 'Review', 'Confirmation'];

  const handleInputChange = (field) => (event) => {
    setTransferData({
      ...transferData,
      [field]: event.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!transferData.fromAccount) newErrors.fromAccount = 'Please select source account';
      if (!transferData.amount || transferData.amount <= 0) newErrors.amount = 'Please enter valid amount';
      
      if (transferData.transferType === 'internal') {
        if (!transferData.toAccount) newErrors.toAccount = 'Please select destination account';
        if (transferData.fromAccount === transferData.toAccount) {
          newErrors.toAccount = 'Source and destination accounts cannot be the same';
        }
      } else {
        if (!transferData.recipientName) newErrors.recipientName = 'Please enter recipient name';
        if (!transferData.recipientAccountNumber) newErrors.recipientAccountNumber = 'Please enter account number';
        if (!transferData.recipientBankCode) newErrors.recipientBankCode = 'Please enter bank code';
      }
      
      // Check if sufficient balance
      const sourceAccount = accounts.find(acc => acc.id === transferData.fromAccount);
      if (sourceAccount && parseFloat(transferData.amount) > sourceAccount.balance) {
        newErrors.amount = 'Insufficient balance';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would dispatch the transfer action
      // dispatch(createTransfer(transferData));
      
      navigate('/transactions', {
        state: { message: 'Transfer completed successfully!' }
      });
    } catch (error) {
      setErrors({ submit: 'Transfer failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Transfer Type</InputLabel>
                <Select
                  value={transferData.transferType}
                  onChange={handleInputChange('transferType')}
                  label="Transfer Type"
                >
                  <MenuItem value="internal">Between My Accounts</MenuItem>
                  <MenuItem value="external">To Another Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" error={!!errors.fromAccount}>
                <InputLabel>From Account</InputLabel>
                <Select
                  value={transferData.fromAccount}
                  onChange={handleInputChange('fromAccount')}
                  label="From Account"
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
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={transferData.amount}
                onChange={handleInputChange('amount')}
                error={!!errors.amount}
                helperText={errors.amount}
                margin="normal"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
            </Grid>
            
            {transferData.transferType === 'internal' ? (
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal" error={!!errors.toAccount}>
                  <InputLabel>To Account</InputLabel>
                  <Select
                    value={transferData.toAccount}
                    onChange={handleInputChange('toAccount')}
                    label="To Account"
                  >
                    {accounts?.filter(acc => acc.id !== transferData.fromAccount).map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name} - {account.accountNumber}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.toAccount && (
                    <Typography variant="caption" color="error">
                      {errors.toAccount}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Recipient Name"
                    value={transferData.recipientName}
                    onChange={handleInputChange('recipientName')}
                    error={!!errors.recipientName}
                    helperText={errors.recipientName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    value={transferData.recipientAccountNumber}
                    onChange={handleInputChange('recipientAccountNumber')}
                    error={!!errors.recipientAccountNumber}
                    helperText={errors.recipientAccountNumber}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bank Code / Routing Number"
                    value={transferData.recipientBankCode}
                    onChange={handleInputChange('recipientBankCode')}
                    error={!!errors.recipientBankCode}
                    helperText={errors.recipientBankCode}
                    margin="normal"
                  />
                </Grid>
              </>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                value={transferData.description}
                onChange={handleInputChange('description')}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        );
        
      case 1:
        const sourceAccount = accounts?.find(acc => acc.id === transferData.fromAccount);
        const destAccount = accounts?.find(acc => acc.id === transferData.toAccount);
        
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Transfer Details
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      From Account
                    </Typography>
                    <Typography variant="body1">
                      {sourceAccount?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {sourceAccount?.accountNumber}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      To {transferData.transferType === 'internal' ? 'Account' : 'Recipient'}
                    </Typography>
                    <Typography variant="body1">
                      {transferData.transferType === 'internal' 
                        ? destAccount?.name 
                        : transferData.recipientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transferData.transferType === 'internal' 
                        ? destAccount?.accountNumber 
                        : transferData.recipientAccountNumber}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h5" color="primary" sx={{ textAlign: 'center' }}>
                      {formatCurrency(transferData.amount)}
                    </Typography>
                    {transferData.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                        {transferData.description}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            
            <Alert severity="info">
              Please review the transfer details carefully. This action cannot be undone.
            </Alert>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <SwapHoriz sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Transfer Completed!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your transfer of {formatCurrency(transferData.amount)} has been processed successfully.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/transactions')}
              sx={{ mt: 2 }}
            >
              View Transactions
            </Button>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Transfer Money
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Card>
        <CardContent>
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}
          
          {renderStepContent(activeStep)}
          
          {activeStep < 2 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 2 ? handleSubmit : handleNext}
                disabled={loading}
                startIcon={activeStep === steps.length - 2 ? <Send /> : null}
              >
                {loading ? 'Processing...' : activeStep === steps.length - 2 ? 'Transfer' : 'Next'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Transfer;