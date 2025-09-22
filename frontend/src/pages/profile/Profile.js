import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Alert,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Security,
  Notifications,
  Phone,
  Email,
  LocationOn,
  Work,
  CalendarToday,
  Verified,
  Warning,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'Dharan',
    lastName: user?.lastName || 'A',
    email: user?.email || 'dharan90951@gmail.com',
    phone: user?.phone || '+91 9952324192',
    address: user?.address || 'Ram Nagar 3rd Street,Velachery,Chennai-600042',
    dateOfBirth: user?.dateOfBirth || '2004-04-15',
    occupation: user?.occupation || 'Web Developer',
    avatar: user?.avatar || 'src=https://i.postimg.cc/13h00000/dharan.jpg',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: true,
    biometricLogin: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData({
      ...passwordData,
      [field]: event.target.value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handlePreferenceChange = (field) => (event) => {
    setPreferences({
      ...preferences,
      [field]: event.target.checked,
    });
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!profileData.firstName) newErrors.firstName = 'First name is required';
    if (!profileData.lastName) newErrors.lastName = 'Last name is required';
    if (!profileData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!profileData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // dispatch(updateProfile(profileData));
      setEditMode(false);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // dispatch(changePassword(passwordData));
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      alert('Password changed successfully!');
    } catch (error) {
      setErrors({ password: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  const renderPersonalInfo = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Personal Information</Typography>
          <Button
            variant={editMode ? 'outlined' : 'contained'}
            startIcon={editMode ? <Cancel /> : <Edit />}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        </Box>
        
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profileData.avatar}
              sx={{ width: 100, height: 100, mr: 3 }}
            >
              {getInitials(profileData.firstName, profileData.lastName)}
            </Avatar>
            {editMode && (
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 20,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' },
                }}
                size="small"
              >
                <PhotoCamera fontSize="small" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </IconButton>
            )}
          </Box>
          <Box>
            <Typography variant="h5">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData.email}
            </Typography>
            <Chip
              icon={<Verified />}
              label="Verified Account"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={profileData.firstName}
              onChange={handleInputChange('firstName')}
              disabled={!editMode}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={profileData.lastName}
              onChange={handleInputChange('lastName')}
              disabled={!editMode}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange('email')}
              disabled={!editMode}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={profileData.phone}
              onChange={handleInputChange('phone')}
              disabled={!editMode}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={profileData.address}
              onChange={handleInputChange('address')}
              disabled={!editMode}
              InputProps={{
                startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={profileData.dateOfBirth}
              onChange={handleInputChange('dateOfBirth')}
              disabled={!editMode}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Occupation"
              value={profileData.occupation}
              onChange={handleInputChange('occupation')}
              disabled={!editMode}
              InputProps={{
                startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
        </Grid>
        
        {editMode && (
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveProfile}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const renderSecurity = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Security Settings
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText
              primary="Password"
              secondary="Last changed 30 days ago"
            />
            <Button
              variant="outlined"
              onClick={() => setShowPasswordDialog(true)}
            >
              Change
            </Button>
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Verified />
            </ListItemIcon>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary={preferences.twoFactorAuth ? 'Enabled' : 'Disabled'}
            />
            <Switch
              checked={preferences.twoFactorAuth}
              onChange={handlePreferenceChange('twoFactorAuth')}
            />
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText
              primary="Biometric Login"
              secondary={preferences.biometricLogin ? 'Enabled' : 'Disabled'}
            />
            <Switch
              checked={preferences.biometricLogin}
              onChange={handlePreferenceChange('biometricLogin')}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  const renderNotifications = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification Preferences
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive account alerts via email"
            />
            <Switch
              checked={preferences.emailNotifications}
              onChange={handlePreferenceChange('emailNotifications')}
            />
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText
              primary="SMS Notifications"
              secondary="Receive transaction alerts via SMS"
            />
            <Switch
              checked={preferences.smsNotifications}
              onChange={handlePreferenceChange('smsNotifications')}
            />
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Push Notifications"
              secondary="Receive notifications in the app"
            />
            <Switch
              checked={preferences.pushNotifications}
              onChange={handlePreferenceChange('pushNotifications')}
            />
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Warning />
            </ListItemIcon>
            <ListItemText
              primary="Marketing Emails"
              secondary="Receive promotional offers and updates"
            />
            <Switch
              checked={preferences.marketingEmails}
              onChange={handlePreferenceChange('marketingEmails')}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Settings
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Personal Info" />
          <Tab label="Security" />
          <Tab label="Notifications" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && renderPersonalInfo()}
      {activeTab === 1 && renderSecurity()}
      {activeTab === 2 && renderNotifications()}
      
      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {errors.password && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.password}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange('currentPassword')}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;