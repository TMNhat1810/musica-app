import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NotificationServices } from '../../../services';
import { Notification } from '../../../common/interfaces';
import dayjs from 'dayjs';

interface NotificationSectionPropsType {
  filter: 'ALL' | 'UNREAD';
}

export default function NotificationSection({
  filter,
}: NotificationSectionPropsType) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleRead = (id: string) => {
    NotificationServices.readNotification(id)
      .then(() => {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, is_read: true }
              : notification,
          ),
        );
      })
      .catch();
  };

  const handleDelete = (id: string) => {
    NotificationServices.deleteNotification(id)
      .then(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id),
        );
      })
      .catch();
  };

  useEffect(() => {
    if (filter === 'ALL')
      NotificationServices.getNotifications()
        .then((data) => setNotifications(data))
        .catch();

    if (filter === 'UNREAD')
      NotificationServices.getUnreadNotifications()
        .then((data) => setNotifications(data.notifications))
        .catch();
  }, [filter]);

  return (
    <Box>
      {notifications.map((notification: Notification) => {
        switch (notification.type) {
          case 'NEW_MEDIA_UPLOAD': {
            return <Box></Box>;
          }
          case 'NEW_COMMENT': {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img
                  src={notification.media.thumbnail_url}
                  alt="poster"
                  style={{ width: 80, height: 60 }}
                />
                <Box>
                  <Box>
                    <Typography>Someone has commented on your media</Typography>
                    <Typography variant="caption">
                      {dayjs(notification.created_at).fromNow()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!notification.is_read && (
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: 3,
                          px: 1,
                          py: 0.5,
                          textTransform: 'none',
                          bgcolor: 'primary.dark',
                          color: 'text.primary',
                        }}
                        onClick={() => handleRead(notification.id)}
                      >
                        <Typography>Read</Typography>
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        borderRadius: 3,
                        color: 'text.primary',
                        px: 1,
                        py: 0.5,
                        textTransform: 'none',
                      }}
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Typography>Delete</Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          }
        }
      })}
    </Box>
  );
}
