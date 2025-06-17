import { Badge, Box, IconButton, Popover, Typography } from '@mui/material';
import { styles } from './style';
import { useEffect, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { NotificationServices } from '../../../services';
import NotificationSection from './NotificationSection';
import { useTranslation } from 'react-i18next';

export default function NotificationControl() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [section, setSection] = useState<'ALL' | 'UNREAD'>('ALL');

  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    NotificationServices.getUnreadNotifications()
      .then((data) => setBadgeCount(data.count))
      .catch();
  }, []);

  return (
    <Box sx={styles.container}>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={badgeCount} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: { sx: { width: 360, maxHeight: 480, overflowY: 'auto' } },
        }}
      >
        <Box sx={styles.popupContainer}>
          <Typography variant="h6" gutterBottom>
            {t('notifications')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                ...styles.iconButton,
                ...(section === 'ALL' && {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }),
              }}
              onClick={() => setSection('ALL')}
            >
              <Typography>{t('all')}</Typography>
            </IconButton>
            <IconButton
              sx={{
                ...styles.iconButton,
                ...(section === 'UNREAD' && {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }),
              }}
              onClick={() => setSection('UNREAD')}
            >
              <Typography>{t('unread')}</Typography>
            </IconButton>
          </Box>
          <Box mt={2}>
            <NotificationSection filter={section} />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
