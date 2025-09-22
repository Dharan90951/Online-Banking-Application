import React from 'react';
import 
{
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Grid,
} from '@mui/material';

const Settings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email Notifications"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="SMS Notifications"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Push Notifications"
            sx={{ display: 'block', mb: 1 }}
          />
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Two-Factor Authentication"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Login Notifications"
            sx={{ display: 'block', mb: 1 }}
          />
          
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
              Change Password
            </Button>
            <Button variant="outlined" color="secondary">
              Reset Security Questions
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Preferences
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Update Contact Information
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Manage Linked Accounts
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Language Preferences
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Currency Display Options
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;