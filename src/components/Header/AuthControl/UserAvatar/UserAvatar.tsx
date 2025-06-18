import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { IUser } from '../../../../contexts/auth/auth';
import { MouseEvent, useState } from 'react';
import { useAuth } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface UserAvatarPropsType {
  user: IUser;
}

export default function UserAvatar({ user }: UserAvatarPropsType) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const { signoutUser } = useAuth();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlerSignout = async () => {
    signoutUser();
    setAnchorEl(null);
    window.location.reload();
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title={user.username}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, border: '2px solid white', padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src={user.photo_url} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              minWidth: '200px',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
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
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate(`/p/${user.id}`)}>
          <Avatar src={user.photo_url} />
          <Box>
            <Typography>{user.display_name}</Typography>
            <Typography>@{user.username}</Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ m: 0 }} />
        <MenuItem onClick={() => navigate('/history')} sx={{ textAlign: 'left' }}>
          <ListItemIcon>
            <HistoryIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText>{t('history')}</ListItemText>
        </MenuItem>
        <Divider sx={{ m: 0 }} />
        <MenuItem onClick={() => navigate('/setting')} sx={{ textAlign: 'left' }}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText>{t('setting')}</ListItemText>
        </MenuItem>
        <Divider sx={{ m: 0 }} />
        <MenuItem onClick={handlerSignout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText>{t('signout')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
