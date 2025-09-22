import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate verification result
        if (token && token.length > 10) {
          setStatus('success');
          setMessage('Your email has been successfully verified!');
        } else {
          setStatus('error');
          setMessage('Invalid or expired verification token.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Failed to verify email. Please try again.');
      }
    };

    verifyEmail();
  }, [token]);

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h5"
        component="h2"
        mb={3}
        fontWeight="medium"
      >
        Email Verification
      </Typography>

      {status === 'verifying' && (
        <Box>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="body1" color="text.secondary">
            Verifying your email address...
          </Typography>
        </Box>
      )}

      {status === 'success' && (
        <Box>
          <CheckCircle
            sx={{
              fontSize: 80,
              color: 'success.main',
              mb: 2,
            }}
          />
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
          <Typography variant="body1" color="text.secondary" mb={3}>
            You can now sign in to your account.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{ px: 4 }}
          >
            Continue to Sign In
          </Button>
        </Box>
      )}

      {status === 'error' && (
        <Box>
          <Error
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 2,
            }}
          />
          <Alert severity="error" sx={{ mb: 3 }}>
            {message}
          </Alert>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Please contact support if you continue to experience issues.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={handleContinue}
            sx={{ px: 4 }}
          >
            Back to Sign In
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VerifyEmail;