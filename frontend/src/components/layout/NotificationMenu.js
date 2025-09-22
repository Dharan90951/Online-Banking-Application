import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Badge,
  IconButton,
} from '@mui/material';
import {
  Notifications,
  NotificationsNone,
  Info,
  Warning,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead } from '../../features/notifications/notificationSlice';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'info':
      return <Info color="info" />;
    case 'warning':
      return <Warning color="warning" />;
    case 'success':
      return <CheckCircle color="success" />;
    case 'error':
      return <Error color="error" />;
    default:
      return <Info color="info" />;
  }
};

const NotificationMenu = ({ anchorEl, open, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          minWidth: 320,
          maxWidth: 400,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Notifications</Typography>
        {unreadCount > 0 && (
          <Typography
            variant="caption"
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Typography>
        )}
      </Box>
      <Divider />
      {recentNotifications.length === 0 ? (
        <Box sx={{ px: 2, py: 3, textAlign: 'center' }}>
          <NotificationsNone sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No notifications
          </Typography>
        </Box>
      ) : (
        recentNotifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => handleMarkAsRead(notification.id)}
            sx={{
              backgroundColor: notification.read ? 'transparent' : 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemIcon>
              {getNotificationIcon(notification.type)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: notification.read ? 'normal' : 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {notification.title}
                </Typography>
              }
              secondary={
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {notification.message}
                </Typography>
              }
            />
          </MenuItem>
        ))
      )}
      {notifications.length > 5 && (
        <>
          <Divider />
          <MenuItem onClick={onClose}>
            <Typography variant="body2" color="primary" sx={{ width: '100%', textAlign: 'center' }}>
              View all notifications
            </Typography>
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default NotificationMenu;