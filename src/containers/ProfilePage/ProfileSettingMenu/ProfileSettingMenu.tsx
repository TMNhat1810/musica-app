import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import { MouseEvent, useState } from 'react';
import ChangeDisplayNameModal from './ChangeDisplayNameModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useTranslation } from 'react-i18next';

export default function ProfileSettingMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [changePasswordModalOpen, setChangePasswordModalOpen] =
    useState<boolean>(false);
  const [changeDisplayNameModalOpen, setChangeDisplayNameModalOpen] =
    useState<boolean>(false);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { t } = useTranslation();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const openChangeDisplayNameModal = () => {
    setChangeDisplayNameModalOpen(true);
  };

  const closeChangeDisplayNameModal = () => {
    setChangeDisplayNameModalOpen(false);
  };

  const openChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  return (
    <Box>
      <IconButton
        sx={{
          '&:focus, &:active, &:hover': {
            outline: 'none',
            border: 'none',
          },
        }}
        onClick={handleOpenMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            openChangeDisplayNameModal();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText>{t('txt-change-display-name')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            openChangePasswordModal();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText>{t('txt-change-password')}</ListItemText>
        </MenuItem>
      </Menu>
      <ChangeDisplayNameModal
        open={changeDisplayNameModalOpen}
        onClose={closeChangeDisplayNameModal}
      />
      <ChangePasswordModal
        open={changePasswordModalOpen}
        onClose={closeChangePasswordModal}
      />
    </Box>
  );
}
