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
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Payment,
  Security,
  Speed,
  Support,
  ArrowForward,
  Dashboard as DashboardIcon,
  AccountBalanceWallet,
  Receipt,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      icon: <Security color="primary" />,
      title: 'Secure Banking',
      description: 'Bank-level security with 256-bit SSL encryption and multi-factor authentication.',
    },
    {
      icon: <Speed color="primary" />,
      title: 'Instant Transfers',
      description: 'Transfer money instantly between accounts or to other banks with real-time processing.',
    },
    {
      icon: <Support color="primary" />,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock customer support team.',
    },
  ];

  const quickActions = [
    {
      icon: <DashboardIcon />,
      title: 'Dashboard',
      description: 'View your account overview and recent activity',
      path: '/',
      color: 'primary',
    },
    {
      icon: <AccountBalanceWallet />,
      title: 'Accounts',
      description: 'Manage your checking and savings accounts',
      path: '/accounts',
      color: 'secondary',
    },
    {
      icon: <Payment />,
      title: 'Transfer Money',
      description: 'Send money to other accounts or external banks',
      path: '/transfer',
      color: 'success',
    },
    {
      icon: <Receipt />,
      title: 'Pay Bills',
      description: 'Pay your bills and manage recurring payments',
      path: '/bills',
      color: 'warning',
    },
  ];

  if (isAuthenticated) {
    return (
      <Box sx={{ p: 3 }}>
        <Container maxWidth="lg">
          {/* Welcome Section */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </Typography>
            <Typography variant="h6" color="text.secondary">
              What would you like to do today?
            </Typography>
          </Box>

          {/* Quick Actions */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', pb: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${action.color}.main`,
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {action.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pt: 0 }}>
                    <Button
                      component={Link}
                      to={action.path}
                      variant="contained"
                      color={action.color}
                      endIcon={<ArrowForward />}
                      size="small"
                    >
                      Go
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Features Section */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Why Choose Our Banking?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.light',
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Not authenticated - show landing page
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom fontWeight="bold">
            Welcome to SecureBank
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Your trusted partner for secure and convenient online banking
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/auth/register"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Open Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          Banking Made Simple
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          Experience the future of banking with our comprehensive online platform
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Join thousands of satisfied customers who trust us with their banking needs.
          </Typography>
          <Button
            component={Link}
            to="/auth/register"
            variant="contained"
            size="large"
            startIcon={<AccountBalance />}
          >
            Open Your Account Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;